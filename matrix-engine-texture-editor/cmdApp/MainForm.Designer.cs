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
            this.rtb = new CmdWindow.CmdWindowBoxSync();
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
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.rtb);
            this.groupBox3.ForeColor = System.Drawing.Color.Lime;
            this.groupBox3.Location = new System.Drawing.Point(319, 2);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(626, 290);
            this.groupBox3.TabIndex = 17;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Interactive Command Window";
            // 
            // rtb
            // 
            this.rtb.BackColor = System.Drawing.Color.Black;
            this.rtb.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.rtb.ExecutingProcess = null;
            this.rtb.Font = new System.Drawing.Font("Courier New", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.rtb.ForeColor = System.Drawing.Color.Lime;
            this.rtb.IgnoreOutputTextMatchingLastInput = true;
            this.rtb.Location = new System.Drawing.Point(7, 26);
            this.rtb.Multiline = true;
            this.rtb.Name = "rtb";
            this.rtb.Size = new System.Drawing.Size(610, 262);
            this.rtb.TabIndex = 0;
            this.rtb.StdoutTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StdoutTextRead);
            this.rtb.StderrTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StderrTextRead);
            // 
            // btnRunCommand
            // 
            this.btnRunCommand.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRunCommand.Location = new System.Drawing.Point(0, 91);
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
            this.txtBxStdin.Location = new System.Drawing.Point(0, 169);
            this.txtBxStdin.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxStdin.Name = "txtBxStdin";
            this.txtBxStdin.Size = new System.Drawing.Size(311, 27);
            this.txtBxStdin.TabIndex = 17;
            this.toolTip.SetToolTip(this.txtBxStdin, "Text to send to the standard input stream of running process.");
            // 
            // btnSendStdinToProcess
            // 
            this.btnSendStdinToProcess.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSendStdinToProcess.Location = new System.Drawing.Point(0, 130);
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
            this.txtBxCmd.Location = new System.Drawing.Point(99, 0);
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
            this.label1.Location = new System.Drawing.Point(1, 2);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(92, 19);
            this.label1.TabIndex = 31;
            this.label1.Text = "Command";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(1, 63);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(147, 19);
            this.label2.TabIndex = 33;
            this.label2.Text = "Cmd Arguments";
            // 
            // txtBxArgs
            // 
            this.txtBxArgs.BackColor = System.Drawing.Color.Black;
            this.txtBxArgs.ForeColor = System.Drawing.Color.Lime;
            this.txtBxArgs.Location = new System.Drawing.Point(139, 55);
            this.txtBxArgs.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxArgs.Name = "txtBxArgs";
            this.txtBxArgs.Size = new System.Drawing.Size(172, 27);
            this.txtBxArgs.TabIndex = 32;
            this.toolTip.SetToolTip(this.txtBxArgs, "Command line arguments to the executable.");
            // 
            // btnClearTextBox
            // 
            this.btnClearTextBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnClearTextBox.Location = new System.Drawing.Point(0, 205);
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
            this.txtBxDirectory.Location = new System.Drawing.Point(139, 29);
            this.txtBxDirectory.Margin = new System.Windows.Forms.Padding(4);
            this.txtBxDirectory.Name = "txtBxDirectory";
            this.txtBxDirectory.Size = new System.Drawing.Size(172, 27);
            this.txtBxDirectory.TabIndex = 34;
            this.toolTip.SetToolTip(this.txtBxDirectory, "Directory path to the command, or blank  (assume in PATH environment variable)");
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(1, 32);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(136, 19);
            this.label3.TabIndex = 35;
            this.label3.Text = "Cmd Directory";
            // 
            // statusStrip1
            // 
            this.statusStrip1.Location = new System.Drawing.Point(0, 312);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Padding = new System.Windows.Forms.Padding(1, 0, 16, 0);
            this.statusStrip1.Size = new System.Drawing.Size(963, 22);
            this.statusStrip1.TabIndex = 38;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 19F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(963, 334);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.btnClearTextBox);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtBxDirectory);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtBxArgs);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtBxCmd);
            this.Controls.Add(this.btnSendStdinToProcess);
            this.Controls.Add(this.txtBxStdin);
            this.Controls.Add(this.btnRunCommand);
            this.Font = new System.Drawing.Font("Stormfaze", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "MainForm";
            this.Text = "Reading Stdout and Stderr - www.CodeProject.com!";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.GroupBox groupBox3;
        private CmdWindow.CmdWindowBoxSync rtb;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ToolTip toolTip;
        private System.Windows.Forms.StatusStrip statusStrip1;
        public System.Windows.Forms.TextBox txtBxStdin;
        public System.Windows.Forms.TextBox txtBxCmd;
        public System.Windows.Forms.TextBox txtBxArgs;
        public System.Windows.Forms.TextBox txtBxDirectory;
        public System.Windows.Forms.Button btnRunCommand;
        public System.Windows.Forms.Button btnSendStdinToProcess;
        public System.Windows.Forms.Button btnClearTextBox;
        }
}

