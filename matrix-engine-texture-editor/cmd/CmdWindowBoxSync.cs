using System;
using System.Diagnostics;
using System.Windows.Forms;
using ProcessReadWriteUtils;
 ﻿
/***************************************************************************************
*  Author: Curt C.
*  Email : harpyeaglecp@aol.com
*
*  Project File: "Solving Problems of Monitoring Standard Output and Error Streams Of A Running Process" 
*                for http://www.codeproject.com
*  
*  This software is released under the Code Project Open License (CPOL)
*
*  See official license description at: http://www.codeproject.com/info/cpol10.aspx
*  
* This software is provided AS-IS without any warranty of any kind.
*
* >>> Please leave this header intact when using this file in other projects <<<
***************************************************************************************/

namespace CmdWindow
{
    /// <summary>
    /// TextBox subclass that uses a ProcessIoManager object to monitor the standard output
    /// and standard error produced by a running background, command-line process.  The control
    /// also allows the user to input text, and to send that text to the standard input of the 
    /// running process.
    /// </summary>
    public partial class CmdWindowBoxSync : TextBox
    {
        // Windows message codes to intercept keystrokes in the overridden WndProc() method
        private const int WM_CHAR = 0x102;
        private const int WM_KEYDOWN = 0x100;
        private const int WM_KEYUP = 0x101;

        // Index into the controls text where the user input starts
        //  (All prior text will be either stdout/stderr text from the running process)
        private int idxStartInputPosition;

        // Index into the controls text area where the user is currently typing.
        // This index will always be great than the idxStartInputPostion index.
        // The user input text will be from 'idxStartInputPosition' to 'idxCurrentInputPosition'
        private int idxCurrentInputPosition;

        // Process that is being executed and monitored for stdout/stdin
        //private Process process;

        // Class that asynchronously monitors the running process, and notifies this  
        // textbox control when stdout/stderr text is read.
        private ProcessIoManager processIoMgr;

        // Convenience array used to pass in parameters via the .Invoke() method
        private object[] singleArgArray;


        // Ignore stdout matching the last input string to running process stdin
        private bool ignoreOutputTextMatchingLastInput = true;

        // Last string that was sent to the standard input of the running process
        private string lastInputTextSentToProcess = "";

        // Delegate declaration, and delegate instance declarations to
        // allow the appending of text to the rich text box.
        // Note: these delegates are invoked (using the this.Invoke() method)
        // so that they run on the rich text box's gui thread.
        private delegate void PutTextCallBackDelegate(string text);
        private PutTextCallBackDelegate PutStdoutTextDelegate;
        private PutTextCallBackDelegate PutStderrTextDelegate;


        #region Public_Behavioral_Properties_And_Events

        /// <summary>
        /// Gets or sets a value indicating whether ignore the output text string that
        /// matches the last string sent to the running process' standard input stream.
        /// This can happen with some command (such as 'cmd.exe') that echos back to stdout
        /// the text that it received as a command on stdin.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if ignore standard output text matching last standard input; otherwise, <c>false</c>.
        /// </value>
        public bool IgnoreOutputTextMatchingLastInput
        {
            get { return ignoreOutputTextMatchingLastInput; }
            set { ignoreOutputTextMatchingLastInput = value; }
        }

        // Event to notify receiver of a string read from stdout stream
        public event StringReadEventHandler StdoutTextRead;

        // Event to notify receiver of a string read from stderr stream
        public event StringReadEventHandler StderrTextRead;

        #endregion

        #region Consructors_And_Initializaation

        /// <summary>
        /// Initializes a new instance of the <see cref="CmdWindowBoxSync"/> class.
        /// </summary>
        public CmdWindowBoxSync()
        {
            InitializeComponent();
            PutStdoutTextDelegate = new PutTextCallBackDelegate(AppendStdoutText);
            PutStderrTextDelegate = new PutTextCallBackDelegate(AppendStderrText);
            singleArgArray = new object[] { 0 };
            Multiline = true;
        }
        #endregion

        #region Process_Interaction

        /// <summary>
        /// Gets or sets the executing process for standard output/standard error
        /// monitoring.
        /// </summary>
        /// <value>The executing process.</value>
        public Process ExecutingProcess
        {
            get
            {
                if (processIoMgr == null)
                    return null;
                return processIoMgr.RunningProcess;
            }
            set
            {
                Clear();

                // Stop any background threads for reading
                if (processIoMgr != null)
                {            
                    // Stop background threads, etc.
                    processIoMgr.StopMonitoringProcessOutput();
                    processIoMgr = null;
                }
                
                if (value != null)
                {
                    // Create a new ProcessIoMgr object, pass in the supplied executing process, and set events to 
                    // receive notification of stdout and stderr text output from the process.
                    processIoMgr = new ProcessIoManager(value);
                    processIoMgr.StderrTextRead += new StringReadEventHandler(OnStderrTextRead);
                    processIoMgr.StdoutTextRead += new StringReadEventHandler(OnStdoutTextRead);
                    // Start the individual threads to monitor process text output
                    processIoMgr.StartProcessOutputRead();
                }
            }
        }

        /// <summary>
        /// Called when [stdout text read].
        /// </summary>
        /// <param name="text">The text.</param>
        private void OnStdoutTextRead(string text)
        {
            singleArgArray[0] = text;
            try
            {
                // Use this.Invoke() to call delegate to prevent cross
                // threading exceptions.
                // This method will put the supplied text into the
                // rich text box.
                this.Invoke(PutStdoutTextDelegate, singleArgArray);
            }
            catch (ObjectDisposedException)
            {
                // Can happen when the application shuts down, the windows
                // get destroyed, but another thread calls this method.
                // The attempt is then made to write to the window 
                // which as been destoryed.         
                if (processIoMgr != null) {
                    processIoMgr.StopMonitoringProcessOutput();
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("CmdWindowSync.OnStdoutTextRead() - EXCEPTION CAUGHT!\n" + ex.Message);
            }
        }

        /// <summary>
        /// Called when [stderr text read].
        /// </summary>
        /// <param name="text">The text.</param>
        private void OnStderrTextRead(string text)
        {
            singleArgArray[0] = text;
            try
            {
                this.Invoke(PutStderrTextDelegate, singleArgArray);
            }
            catch (ObjectDisposedException)
            {
                processIoMgr.StopMonitoringProcessOutput();
            }
            catch (Exception ex)
            {
                Console.WriteLine("CmdWindowSync.OnStderrTextRead() - EXCEPTION CAUGHT!\n" + ex.Message);
            }
        }
        #endregion

        #region Public_Properties

        /// <summary>
        /// Get the portion of text that is the user input text
        /// (Should be the text at the end of the base.Text string)
        /// </summary>
        public string InputText
        {
            get
            {
                string result = "";
                if (idxStartInputPosition >= 0 && idxCurrentInputPosition > idxStartInputPosition)
                    result = Text.Substring(idxStartInputPosition);
                return result;
            }
        }

        /// <summary>
        /// Gets the output text (without the InputText).
        /// </summary>
        /// <value>The output text.</value>
        public string OutputText
        {
            get
            {
                if (idxStartInputPosition > 0)
                    return base.Text.Substring(0, idxStartInputPosition);
                return base.Text;
            }
        }

        /// <summary>
        /// Gets or sets the current text in the <see cref="T:System.Windows.Forms.TextBox"/>.
        /// </summary>
        /// <value></value>
        /// <returns>The text displayed in the control.</returns>
        public override string Text
        {
            // Note: this property is called from base.Clear()
            get
            {
                // Still returns everything in text box 
                // (input/and output text)
                return base.Text;
            }
            set
            {
                // Replace the entire text - 
                // erase input text as well.
                ClearInputTextIndicies();
                base.Text = ScrubText(value);

                if (String.IsNullOrEmpty(value))
                    // The control is being cleared.
                    ZeroTextPositions();
            }
        }
        #endregion


        /// <summary>
        /// Clears all text from the text box control        
        /// </summary>
        public new void Clear()
        {
            ZeroTextPositions();
            base.Clear();
        }

        /// <summary>
        /// Writes the supplied text to the standard input of the running process' standard input stream.
        /// </summary>
        /// <param name="inputText">The input text string to write to the running process' standard input stream.</param>
        public void WriteTextToProcessStdin(string inputText)
        {
            if (processIoMgr != null && ExecutingProcess != null && ExecutingProcess.HasExited == false && String.IsNullOrEmpty(inputText) == false)
            {
                // Save the text that we're sending
                lastInputTextSentToProcess = inputText;

                // Adjust indexing positions                             
                idxStartInputPosition = GetStartOfInputIndex();
                idxCurrentInputPosition = idxStartInputPosition;
                SelectionStart = idxStartInputPosition;

                Console.WriteLine("CmdWindowBoxSync.SendInputTextToProcess()-Sending Text [" + inputText + "]");

                // Perform acutal stdin write
                processIoMgr.WriteStdin(inputText);
            }
        }

        /// <summary>
        /// The TextBox appears to eliminate the '\r' character
        /// when manipulating text, so just make sure to eliminate
        /// it before doing any other manipulation internally. 
        /// </summary>
        /// <param name="text">The text string to scrub.</param>
        /// <returns>Scrubbed text</returns>
        private string ScrubText(string text)
        {
            string result = text;
            if (result != null)
            {
                result = result.Replace("\r", "");
            }
            return result;
        }

        //public void AppendInputText(string inputText)
        //{
        //    inputText = ScrubText(Text);

        //    string newInputText = InputText + inputText;

        //    // Initialize starting input position if it is not already initialized
        //    if (idxStartInputPosition < 0)
        //        idxStartInputPosition = GetStartOfInputIndex();

        //    // Append the input text to the end of the text on screen
        //    base.Text += newInputText;

        //    // Update the current input text position
        //    idxCurrentInputPosition = idxStartInputPosition + inputText.Length;

        //    // Position the cursor at the end for the text
        //    SelectionStart = idxCurrentInputPosition;
        //    this.ScrollToCaret();
        //}


        /// <summary>
        /// Appends the given text (standard output text from running process), to the text displayed
        /// in this text box.
        /// </summary>
        /// <param name="outputText">The stdout output text of the running process.</param>
        private void AppendStdoutText(string outputText)
        {
            if (ignoreOutputTextMatchingLastInput == true && lastInputTextSentToProcess.Length > 0 && ScrubText(outputText).Trim() == ScrubText(lastInputTextSentToProcess).Trim())
            {
                // The running process has echoed the text that was it was last sent to it (which should be displaying
                // in the text box)
                // Since it is already displayed, then don't repeat the text.
                // The only thing to output is a newline character, to get the text box start displaying
                // subsequent text on the next line (if the text to display ends in a newline character)
                // (This behavior can be observed with the 'cmd.exe' command.
                Console.WriteLine("AppendStdoutText()- Ignoring last input text:" + ScrubText(lastInputTextSentToProcess));
                if (outputText.EndsWith("\n"))
                    AppendOutputText("\n", true);
            }
            else
            {
                AppendOutputText(outputText, true);
            }

            lastInputTextSentToProcess = "";
        }

        /// <summary>
        /// Appends the given text (standard error text from running process), to the text displayed
        /// in this text box.
        /// </summary>
        /// <param name="outputText">The stderr output text of the running process.</param>
        private void AppendStderrText(string outputText)
        {
            AppendOutputText(outputText, false);
        }


        /// <summary>
        /// Appends the output text of a running process, either stdout or stderr text,
        /// to the control.
        /// </summary>
        /// <param name="outputText">The output text from the running process.</param>
        /// <param name="isStdout">if set to <c>true</c> the text is stdout text, otherwise stderr text is assumed.</param>
        private void AppendOutputText(string outputText, bool isStdout)
        {
            if (String.IsNullOrEmpty(outputText) == false)
            {
                outputText = ScrubText(outputText);

                string currentOutputText = this.OutputText;
                string currentInputText = this.InputText;

                if (currentInputText.Length > 0)
                {
                    // Erase the input text: 
                    // This is done because it is too much overhead
                    // to do:  Text += currentOutputText + currentInputText
                    // Way too much flicker and performance degredation - better
                    // to do an append of the text we need to add
                    ClearInputTextIndicies();
                    Text = currentOutputText;
                }

                AppendText(outputText);
                idxStartInputPosition = GetStartOfInputIndex();
                idxCurrentInputPosition = idxStartInputPosition;
                SelectionStart = idxStartInputPosition;

                this.ScrollToCaret();

                // Notify via events of stream text read
                if (isStdout == true && StdoutTextRead != null)
                    StdoutTextRead(outputText);
                else if (isStdout == false && StderrTextRead != null)
                    StderrTextRead(outputText);
            }
        }

        /// <summary>
        /// Sets the SelectionStart, idxStartInputPosition, and idxCurrentInputPosition to zero.
        /// </summary>
        private void ZeroTextPositions()
        {
            SelectionStart = 0;
            idxStartInputPosition = 0;
            idxCurrentInputPosition = 0;
        }

        /// <summary>
        /// Sets idxStartInputPosition and idxCurrentInputPosition indicies to '-1'
        /// </summary>
        private void ClearInputTextIndicies()
        {
            idxStartInputPosition = -1;
            idxCurrentInputPosition = -1;
        }

        /// <summary>
        /// Returns the next position for the user to enter text.
        /// This value is the Text.Length value. The 'Text' being displayed is the
        /// stdout/stderr output of running processes.
        /// </summary>
        /// <returns>Next position in this textbox for user input</returns>
        private int GetStartOfInputIndex()
        {
            int result;
            result = Text.Length;
            return result;
        }

        #region KEYBOARD_HANDLING_METHODS_AND_OVERRIDES


        // true if the control key has been pressed (key down),
        // and false when it is released (key up)
        // Used for detecting CONTROL-C, or other combinations
        private bool controlKeyPressed;

        /// <summary>
        /// Override of base WndProc method, to custom handle
        /// WM_KEYDOWN, WM_CHAR, and WM_KEYUP messages.
        /// </summary>
        /// <param name="m">A Windows Message object.</param>
        protected override void WndProc(ref Message m)
        {
            bool handled = false;
            if (m.Msg == WM_KEYDOWN || m.Msg == WM_CHAR || m.Msg == WM_KEYUP)
            {
                if (ProcessKey((int)m.WParam, m.Msg) == false)
                    handled = true;
            }

            if (handled == true)
            {
                // Eat the message!
                m.Msg = 0;
                m.WParam = IntPtr.Zero;
                m.LParam = IntPtr.Zero;
            }
            else
            {
                base.WndProc(ref m);
            }
        }

        /// <summary>
        /// Figure out if the given key should be processed:
        /// Options:
        /// (1) Do not process the key, if an attempt in being made to modify
        /// the text prior to the set input position. (caret position is less
        /// than the set input position)
        /// (2) Allow processing of arrow keys, so user can move around the
        /// screen, regardless of the position
        /// (3) For BACKSPACE key, only allow a back space if the user is in the
        /// input portion of the text (i.e. - end of text) - caret position is
        /// less than or equal to the starting input position.
        /// </summary>
        /// <param name="keycode">The keycode.</param>
        /// <param name="msg">Message value from WndProc.</param>
        /// <returns>Returns true if the message should be handled by default processing, false if the message is locally handled</returns>
        private bool ProcessKey(int keycode, int msg)
        {
            bool handleKeyEvent = true;

            //Console.WriteLine("ProcessKeyDown: SelectionStart=" + SelectionStart + ", idxCurrent=" + idxCurrentInputPosition + ", idxStart=" + idxStartInputPosition);
            switch (keycode)
            {
                case (int)Keys.Left:
                case (int)Keys.Right:
                case (int)Keys.Down:
                case (int)Keys.Up:
                case (int)Keys.Home:
                case (int)Keys.End:
                case (int)Keys.PageDown:
                case (int)Keys.PageUp:
                    // Allow the movement keys around the box (no modifications to text for these)
                    break;

                case (int)Keys.ControlKey:
                    if (msg == WM_KEYUP)
                        controlKeyPressed = false;
                    else if (msg == WM_KEYDOWN)
                        controlKeyPressed = true;
                    break;

                case (int)Keys.Back:
                    if (SelectionStart <= idxStartInputPosition)
                    {
                        // Do not allow the backspace key to go beyond the
                        // input starting position and erase output text
                        handleKeyEvent = false;
                    }
                    break;

                case (int)Keys.C:
                case (int)Keys.A:
                    if (controlKeyPressed == true)
                    {
                        // Do nothing - Allow normal processing of a CONTROL-C (Copy),
                        // or a CONTROL-A (Select all)
                        Console.WriteLine("CONTROL-" + ((char)keycode).ToString().ToUpper() + " !!!");
                    }
                    else
                    {
                        // Perform the default processing for keys pressed.
                        // (See also default: section)
                        if (SelectionStart < idxStartInputPosition)
                            handleKeyEvent = false;
                    }
                    break;

                case (int)Keys.Enter: // (Same as 'Keys.Return')
                    // User has pressed enter/return - Send input text to the running process
                    if (msg == WM_KEYUP)
                    {
                        // This handling was done more for 'cmd.exe' than anything else.
                        // If a "\n" character is sent to cmd.exe, the that process 
                        // sends back two prompts, instead of the expected one prompt.
                        // Therefore - do not send a newline character to that process,
                        // but just send a blank.
                        //
                        // NOTE: This may have to be adjusted for other types of command line processes,
                        // and what the expect to receive (newlines, etc).
                        string textToSend = InputText;
                        if (InputText.Length <= 0)
                            textToSend = " ";
                        WriteTextToProcessStdin(textToSend);
                    }
                    handleKeyEvent = false;
                    break;

                default:
                    // For all other keys (should be input keys, etc),
                    // Make sure the the modification operation is not 
                    // prior to the input starting position.
                    if (SelectionStart < idxStartInputPosition)
                        handleKeyEvent = false;
                    break;
            }
            return handleKeyEvent;
        }

        /// <summary>
        /// Raises the <see cref="E:System.Windows.Forms.Control.KeyDown"/> event.
        /// </summary>
        /// <param name="e">A <see cref="T:System.Windows.Forms.KeyEventArgs"/> that contains the event data.</param>
        protected override void OnKeyDown(KeyEventArgs e)
        {
            //Console.WriteLine("OnKeyDown");
            //Console.WriteLine("SelectionStart=" + SelectionStart + ", idxCurrent=" + idxCurrentInputPosition + ", idxStart=" + idxStartInputPosition);
            base.OnKeyDown(e);
            idxCurrentInputPosition = SelectionStart;
        }

        /// <summary>
        /// Raises the <see cref="E:System.Windows.Forms.Control.KeyUp"/> event.
        /// </summary>
        /// <param name="e">A <see cref="T:System.Windows.Forms.KeyEventArgs"/> that contains the event data.</param>
        protected override void OnKeyUp(KeyEventArgs e)
        {
            //Console.WriteLine("OnKeyUp");
            //Console.WriteLine("SelectionStart=" + SelectionStart + ", idxCurrent=" + idxCurrent + ", idxStart=" + idxStart);
            base.OnKeyUp(e);
            idxCurrentInputPosition = SelectionStart;
        }

        /// <summary>
        /// Raises the <see cref="E:System.Windows.Forms.Control.KeyPress"/> event.
        /// </summary>
        /// <param name="e">A <see cref="T:System.Windows.Forms.KeyPressEventArgs"/> that contains the event data.</param>
        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            //Console.WriteLine("OnKeyPress");
            //Console.WriteLine("SelectionStart=" + SelectionStart + ", idxCurrent=" + idxCurrentInputPosition + ", idxStart=" + idxStartInputPosition);
            base.OnKeyPress(e);
            idxCurrentInputPosition = SelectionStart;
        }

        #endregion
    }
}
