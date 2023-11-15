using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

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

namespace CmdWindowControlTestApp {


    /// <summary>
    /// Form which displays options for running a command-line command, and monitoring and
    /// displaying that command standard output and standard error text output.
    /// A text box control is presented as a command line window for the running process.
    /// </summary>
    /// 
    /// <remarks>    
    /// NOTES: When running a command-line process via the "Process" class, use the cmd.exe program
    /// to launch the command.
    /// For example, if you want to run the 'ping localhost' command, run the command, "cmd.exe" and
    /// supply the command line arguments:  " /c ping localhost ".
    /// This is the easiest way to run command-line processes.
    /// </remarks>
    public partial class MainForm : Form {
        // Command line process that is being monitored for standard output/standard error text output.
        public Process runningProcess;
        public int _PID_;

        /// <summary>
        /// Initializes a new instance of the <see cref="MainForm"/> class.
        /// </summary>
        public MainForm() {
            InitializeComponent();
        }

        /// <summary>
        /// Handles the FormClosing event of the MainForm control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.Windows.Forms.FormClosingEventArgs"/> instance containing the event data.</param>
        private void MainForm_FormClosing(object sender, FormClosingEventArgs e) {
            DestroyExecutingProcess();
        }

        /// <summary>
        /// Kills and disposes of the currently executing process (if a valid process exists).
        /// </summary>
        private void DestroyExecutingProcess() {
            try {
                if (runningProcess != null) {
                    if (runningProcess.HasExited == false)
                        runningProcess.Kill();
                    runningProcess.Dispose();
                    runningProcess = null;
                }
            } catch (Exception ex) {
                MessageBox.Show("DestoryExecutingProcess: Exception=" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnRunCommand control.
        /// Runs the command supplied on the Form.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        private void btnRunCommand_Click(object sender, EventArgs e) {
            string cmdDirectory = "";
            string cmd;
            string cmdPath;
            string args;

            try {
                DestroyExecutingProcess();

                cmd = txtBxCmd.Text.Trim();
                cmdDirectory = txtBxDirectory.Text.Trim();
                args = txtBxArgs.Text.Trim();

                if (cmdDirectory.Length > 0) {
                    // Combine directory and command to make full path to command
                    cmdPath = Path.Combine(cmdDirectory, cmd);
                } else {
                    // Assume that the command directory is in the PATH environment variable
                    cmdPath = cmd;
                }


                // When running a command-line process via the Process class, invoke the command using the Windows
                // command line interpretter "cmd.exe", with the "/c" argument, followed by the desired command to run
                if (cmdPath.ToUpper().StartsWith("CMD.EXE") == false && cmdPath.ToUpper().StartsWith("CMD ") == false) {
                    args = " /c " + cmdPath + " " + args;
                    cmdPath = "cmd.exe";
                }

                RunCmdLineProcess(cmdPath, args, cmdDirectory);
            } catch (Exception ex) {
                MessageBox.Show("Error starting process:\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        /// <summary>
        /// Runs the command line process for synchronous read.
        /// </summary>
        /// <param name="executableName">Name of the executable (throws exception if null or blank).</param>
        /// <param name="arguments">The command line arguments to the executable (optional)</param>
        /// <param name="workingDirectory">The working directory for the command (can be null/blank for no arguments).</param>
        /// <returns>Running process</returns>
        private Process RunCmdLineProcess(string executableName, string arguments, string workingDirectory) {
            string currentDirectory = Directory.GetCurrentDirectory();

            executableName = (executableName == null) ? "" : executableName.Trim();

            if (executableName.Length <= 0) {
                throw new ArgumentException("Unable to start process - executableName was not supplied.");
            }

            if (string.IsNullOrEmpty(workingDirectory) == false) {
                if (Directory.Exists(workingDirectory) == false)
                    throw new DirectoryNotFoundException("RunCmdLineProcessForSynchronousRead: Supplied working directory does not exist");
            }

            // Create ProcessInfo object, and set properties to be able to read stderr, stdout and write stdin.
            ProcessStartInfo pinfo = new ProcessStartInfo(executableName, arguments);
            if (workingDirectory != null && String.IsNullOrEmpty(workingDirectory.Trim()) == false)
                pinfo.WorkingDirectory = workingDirectory.Trim();

            pinfo.UseShellExecute = false;
            pinfo.RedirectStandardInput = true;
            pinfo.RedirectStandardOutput = true;
            pinfo.RedirectStandardError = true; // Note 'Process' throws an error if all stdout/stderr/stdin are redirected?
            pinfo.CreateNoWindow = true;

            // Create the process, using the ProcessInfo object just created.
            runningProcess = Process.Start(pinfo);

            _PID_ = runningProcess.Id;
            this.Text = _PID_.ToString();
            groupBox3.Text = _PID_.ToString();
            // Give the text box control the process so it can start monitoring output
            rtb.ExecutingProcess = runningProcess;

            return runningProcess;
        }

        /// <summary>
        /// Handles the Click event of the btnSendStdinToProcess control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        private void btnSendStdinToProcess_Click(object sender, EventArgs e) {
            rtb.WriteTextToProcessStdin(txtBxStdin.Text.Trim());
        }

        /// <summary>
        /// Handles the Click event of the btnClearTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        private void btnClearTextBox_Click(object sender, EventArgs e) {
            rtb.Clear();
        }

        /// <summary>
        /// Event method for the EOnStdoutTextRead event - called when standard output text is read
        /// </summary>
        /// <param name="text">The standard output text of the running command.</param>
        private void rtb_StdoutTextRead(string text) {
            // Do custom handling of the standard output text here ...
            Console.WriteLine("MainForm.EOnStdoutTextRead-text=" + text);
            if (text.Contains("http://127.0.0.1")) {
                text = text.Replace("http://127.0.0.1", "http://localhost");
                text = text.Replace("  ", "");
                result.Text = text;
            } else if (text.Contains("my software")) {
                resultEditor.Text = text;
            }
        }

        /// <summary>
        /// Event method for the EOnStderrTextRead event - called when standard error text is read
        /// </summary>
        /// <param name="text">The standard error text of the running command.</param>
        private void rtb_StderrTextRead(string text) {
            // Do custom handling of the standard error text here ...
            //Console.WriteLine("MainForm.EOnStderrTextRead- text=" + text);

        }

        private void MainForm_Load(object sender, EventArgs e) {
            this.btnRunCommand.PerformClick();

        }

        private void KILL_Click(object sender, EventArgs e) {
            runningProcess.Kill();


        }

        private void groupBox3_Enter(object sender, EventArgs e) {

        }

        private void killProc_Click(object sender, EventArgs e) {

            this.Hide();
           //  txtBxStdin.Text = @"taskkill /F " + _PID_;
           // btnSendStdinToProcess.PerformClick();

        }
    }
}
