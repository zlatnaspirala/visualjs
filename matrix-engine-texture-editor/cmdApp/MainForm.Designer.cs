namespace CmdWindowControlTestApp
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.btnRunCommand = new System.Windows.Forms.Button();
            this.txtBxStdin = new System.Windows.Forms.TextBox();
            this.btnSendStdinToProcess = new System.Windows.Forms.Button();
            this.txtBxCmd = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtBxArgs = new System.Windows.Forms.TextBox();
            this.btnClearTextBox = new System.Windows.Forms.Button();
            this.txtBxDirectory = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.toolTip = new System.Windows.Forms.ToolTip(this.components);
            this.KILL = new System.Windows.Forms.Button();
            this.result = new System.Windows.Forms.TextBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.rtb = new CmdWindow.CmdWindowBoxSync();
            this.killProc = new System.Windows.Forms.Button();
            this.groupBox3.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.killProc);
            this.groupBox3.Controls.Add(this.rtb);
            this.groupBox3.Controls.Add(this.result);
            this.groupBox3.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.groupBox3.ForeColor = System.Drawing.Color.Lime;
            this.groupBox3.Location = new System.Drawing.Point(1, 0);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(720, 218);
            this.groupBox3.TabIndex = 17;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Command Window";
            this.groupBox3.Enter += new System.EventHandler(this.groupBox3_Enter);
            // 
            // btnRunCommand
            // 
            this.btnRunCommand.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRunCommand.Location = new System.Drawing.Point(2, 119);
            this.btnRunCommand.Margin = new System.Windows.Forms.Padding(4);
            this.btnRunCommand.Name = "btnRunCommand";
            this.btnRunCommand.Size = new System.Drawing.Size(311, 31);
            this.btnRunCommand.TabIndex = 26;
            this.btnRunCommand.Text = "Run And Monitor Process";
            this.btnRunCommand.UseVisualStyleBackColor = true;
            this.btnRunCommand.Click += new System.EventHandler(this.btnRunCommand_Click);
            // 
            // txtBxStdin
            // 
            this.txtBxStdin.BackColor = System.Drawing.Color.Black;
            this.txtBxStdin.ForeColor = System.Drawing.Color.Lime;
            this.txtBxStdin.Location = new System.Drawing.Point(2, 197);
            this.txtBxStdin.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxStdin.Name = "txtBxStdin";
            this.txtBxStdin.Size = new System.Drawing.Size(311, 27);
            this.txtBxStdin.TabIndex = 17;
            this.toolTip.SetToolTip(this.txtBxStdin, "Text to send to the standard input stream of running process.");
            // 
            // btnSendStdinToProcess
            // 
            this.btnSendStdinToProcess.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSendStdinToProcess.Location = new System.Drawing.Point(2, 158);
            this.btnSendStdinToProcess.Margin = new System.Windows.Forms.Padding(4);
            this.btnSendStdinToProcess.Name = "btnSendStdinToProcess";
            this.btnSendStdinToProcess.Size = new System.Drawing.Size(311, 31);
            this.btnSendStdinToProcess.TabIndex = 27;
            this.btnSendStdinToProcess.Text = "Send Text Standard Input";
            this.btnSendStdinToProcess.UseVisualStyleBackColor = true;
            this.btnSendStdinToProcess.Click += new System.EventHandler(this.btnSendStdinToProcess_Click);
            // 
            // txtBxCmd
            // 
            this.txtBxCmd.BackColor = System.Drawing.Color.Black;
            this.txtBxCmd.ForeColor = System.Drawing.Color.Lime;
            this.txtBxCmd.Location = new System.Drawing.Point(101, 28);
            this.txtBxCmd.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxCmd.Name = "txtBxCmd";
            this.txtBxCmd.Size = new System.Drawing.Size(212, 27);
            this.txtBxCmd.TabIndex = 30;
            this.txtBxCmd.Text = "cmd.exe";
            this.toolTip.SetToolTip(this.txtBxCmd, "Name of executable program (command only - not the full path)");
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(3, 30);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(92, 19);
            this.label1.TabIndex = 31;
            this.label1.Text = "Command";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(3, 91);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(147, 19);
            this.label2.TabIndex = 33;
            this.label2.Text = "Cmd Arguments";
            // 
            // txtBxArgs
            // 
            this.txtBxArgs.BackColor = System.Drawing.Color.Black;
            this.txtBxArgs.ForeColor = System.Drawing.Color.Lime;
            this.txtBxArgs.Location = new System.Drawing.Point(141, 83);
            this.txtBxArgs.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxArgs.Name = "txtBxArgs";
            this.txtBxArgs.Size = new System.Drawing.Size(172, 27);
            this.txtBxArgs.TabIndex = 32;
            this.toolTip.SetToolTip(this.txtBxArgs, "Command line arguments to the executable.");
            // 
            // btnClearTextBox
            // 
            this.btnClearTextBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnClearTextBox.Location = new System.Drawing.Point(2, 233);
            this.btnClearTextBox.Margin = new System.Windows.Forms.Padding(4);
            this.btnClearTextBox.Name = "btnClearTextBox";
            this.btnClearTextBox.Size = new System.Drawing.Size(311, 31);
            this.btnClearTextBox.TabIndex = 37;
            this.btnClearTextBox.Text = "Clear Text Box";
            this.toolTip.SetToolTip(this.btnClearTextBox, "Clear all input/output text in the Interactive Command Window");
            this.btnClearTextBox.UseVisualStyleBackColor = true;
            this.btnClearTextBox.Click += new System.EventHandler(this.btnClearTextBox_Click);
            // 
            // txtBxDirectory
            // 
            this.txtBxDirectory.BackColor = System.Drawing.Color.Black;
            this.txtBxDirectory.ForeColor = System.Drawing.Color.Lime;
            this.txtBxDirectory.Location = new System.Drawing.Point(141, 57);
            this.txtBxDirectory.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxDirectory.Name = "txtBxDirectory";
            this.txtBxDirectory.Size = new System.Drawing.Size(172, 27);
            this.txtBxDirectory.TabIndex = 34;
            this.toolTip.SetToolTip(this.txtBxDirectory, "Directory path to the command, or blank  (assume in PATH environment variable)");
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(3, 60);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(136, 19);
            this.label3.TabIndex = 35;
            this.label3.Text = "Cmd Directory";
            // 
            // KILL
            // 
            this.KILL.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.KILL.Location = new System.Drawing.Point(0, 272);
            this.KILL.Margin = new System.Windows.Forms.Padding(4);
            this.KILL.Name = "KILL";
            this.KILL.Size = new System.Drawing.Size(313, 31);
            this.KILL.TabIndex = 39;
            this.KILL.Text = "KILL";
            this.toolTip.SetToolTip(this.KILL, "Clear all input/output text in the Interactive Command Window");
            this.KILL.UseVisualStyleBackColor = true;
            this.KILL.Click += new System.EventHandler(this.KILL_Click);
            // 
            // result
            // 
            this.result.BackColor = System.Drawing.Color.Black;
            this.result.ForeColor = System.Drawing.Color.Lime;
            this.result.Location = new System.Drawing.Point(2, 185);
            this.result.Margin = new System.Windows.Forms.Padding(4);
            this.result.Name = "result";
            this.result.Size = new System.Drawing.Size(359, 27);
            this.result.TabIndex = 40;
            this.toolTip.SetToolTip(this.result, "Text to send to the standard input stream of running process.");
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.label3);
            this.panel1.Controls.Add(this.btnRunCommand);
            this.panel1.Controls.Add(this.KILL);
            this.panel1.Controls.Add(this.txtBxStdin);
            this.panel1.Controls.Add(this.btnSendStdinToProcess);
            this.panel1.Controls.Add(this.btnClearTextBox);
            this.panel1.Controls.Add(this.txtBxCmd);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.txtBxDirectory);
            this.panel1.Controls.Add(this.txtBxArgs);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Location = new System.Drawing.Point(200, 224);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(315, 314);
            this.panel1.TabIndex = 41;
            // 
            // rtb
            // 
            this.rtb.BackColor = System.Drawing.Color.Black;
            this.rtb.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.rtb.ExecutingProcess = null;
            this.rtb.Font = new System.Drawing.Font("Courier New", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.rtb.ForeColor = System.Drawing.Color.Lime;
            this.rtb.IgnoreOutputTextMatchingLastInput = true;
            this.rtb.Location = new System.Drawing.Point(4, 18);
            this.rtb.Multiline = true;
            this.rtb.Name = "rtb";
            this.rtb.Size = new System.Drawing.Size(718, 167);
            this.rtb.TabIndex = 0;
            this.rtb.StdoutTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StdoutTextRead);
            this.rtb.StderrTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StderrTextRead);
            // 
            // killProc
            // 
            this.killProc.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.killProc.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.killProc.Location = new System.Drawing.Point(658, 186);
            this.killProc.Margin = new System.Windows.Forms.Padding(4);
            this.killProc.Name = "killProc";
            this.killProc.Size = new System.Drawing.Size(55, 26);
            this.killProc.TabIndex = 41;
            this.killProc.Text = "KILL";
            this.killProc.UseVisualStyleBackColor = true;
            this.killProc.Click += new System.EventHandler(this.killProc_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 19F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(733, 555);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.groupBox3);
            this.Font = new System.Drawing.Font("Stormfaze", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.Manual;
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.GroupBox groupBox3;
        private CmdWindow.CmdWindowBoxSync rtb;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ToolTip toolTip;
        public System.Windows.Forms.TextBox txtBxStdin;
        public System.Windows.Forms.TextBox txtBxCmd;
        public System.Windows.Forms.TextBox txtBxArgs;
        public System.Windows.Forms.TextBox txtBxDirectory;
        public System.Windows.Forms.Button btnRunCommand;
        public System.Windows.Forms.Button btnSendStdinToProcess;
        public System.Windows.Forms.Button btnClearTextBox;
        public System.Windows.Forms.Button KILL;
        public System.Windows.Forms.TextBox result;
        private System.Windows.Forms.Panel panel1;
        public System.Windows.Forms.Button killProc;
        }
}

