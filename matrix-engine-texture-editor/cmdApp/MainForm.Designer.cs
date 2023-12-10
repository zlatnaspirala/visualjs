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
            this.buildFinalVJS3 = new System.Windows.Forms.TextBox();
            this.nativeExeBuild = new System.Windows.Forms.TextBox();
            this.resultNpmI = new System.Windows.Forms.TextBox();
            this.resultEditor = new System.Windows.Forms.TextBox();
            this.killProc = new System.Windows.Forms.Button();
            this.rtb = new CmdWindow.CmdWindowBoxSync();
            this.result = new System.Windows.Forms.TextBox();
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
            this.panel1 = new System.Windows.Forms.Panel();
            this.BIGTEXT = new System.Windows.Forms.Label();
            this.linkLabel1 = new System.Windows.Forms.LinkLabel();
            this.groupBox3.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.buildFinalVJS3);
            this.groupBox3.Controls.Add(this.nativeExeBuild);
            this.groupBox3.Controls.Add(this.resultNpmI);
            this.groupBox3.Controls.Add(this.resultEditor);
            this.groupBox3.Controls.Add(this.killProc);
            this.groupBox3.Controls.Add(this.rtb);
            this.groupBox3.Controls.Add(this.result);
            this.groupBox3.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.groupBox3.ForeColor = System.Drawing.Color.Lime;
            this.groupBox3.Location = new System.Drawing.Point(1, 0);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox3.Size = new System.Drawing.Size(785, 229);
            this.groupBox3.TabIndex = 17;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Command Window";
            this.groupBox3.Enter += new System.EventHandler(this.groupBox3_Enter);
            // 
            // buildFinalVJS3
            // 
            this.buildFinalVJS3.BackColor = System.Drawing.Color.Black;
            this.buildFinalVJS3.ForeColor = System.Drawing.Color.Lime;
            this.buildFinalVJS3.Location = new System.Drawing.Point(544, 276);
            this.buildFinalVJS3.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.buildFinalVJS3.Name = "buildFinalVJS3";
            this.buildFinalVJS3.Size = new System.Drawing.Size(133, 27);
            this.buildFinalVJS3.TabIndex = 45;
            this.toolTip.SetToolTip(this.buildFinalVJS3, "Text to send to the standard input stream of running process.");
            // 
            // nativeExeBuild
            // 
            this.nativeExeBuild.BackColor = System.Drawing.Color.Black;
            this.nativeExeBuild.ForeColor = System.Drawing.Color.Lime;
            this.nativeExeBuild.Location = new System.Drawing.Point(401, 276);
            this.nativeExeBuild.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.nativeExeBuild.Name = "nativeExeBuild";
            this.nativeExeBuild.Size = new System.Drawing.Size(133, 27);
            this.nativeExeBuild.TabIndex = 44;
            this.toolTip.SetToolTip(this.nativeExeBuild, "Text to send to the standard input stream of running process.");
            // 
            // resultNpmI
            // 
            this.resultNpmI.BackColor = System.Drawing.Color.Black;
            this.resultNpmI.ForeColor = System.Drawing.Color.Lime;
            this.resultNpmI.Location = new System.Drawing.Point(699, 242);
            this.resultNpmI.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.resultNpmI.Name = "resultNpmI";
            this.resultNpmI.Size = new System.Drawing.Size(91, 27);
            this.resultNpmI.TabIndex = 43;
            this.toolTip.SetToolTip(this.resultNpmI, "Text to send to the standard input stream of running process.");
            // 
            // resultEditor
            // 
            this.resultEditor.BackColor = System.Drawing.Color.Black;
            this.resultEditor.ForeColor = System.Drawing.Color.Lime;
            this.resultEditor.Location = new System.Drawing.Point(544, 242);
            this.resultEditor.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.resultEditor.Name = "resultEditor";
            this.resultEditor.Size = new System.Drawing.Size(145, 27);
            this.resultEditor.TabIndex = 42;
            this.toolTip.SetToolTip(this.resultEditor, "Text to send to the standard input stream of running process.");
            // 
            // killProc
            // 
            this.killProc.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.killProc.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.killProc.Location = new System.Drawing.Point(676, 195);
            this.killProc.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.killProc.Name = "killProc";
            this.killProc.Size = new System.Drawing.Size(100, 27);
            this.killProc.TabIndex = 41;
            this.killProc.Text = "HIDE";
            this.killProc.UseVisualStyleBackColor = true;
            this.killProc.Click += new System.EventHandler(this.killProc_Click);
            // 
            // rtb
            // 
            this.rtb.BackColor = System.Drawing.Color.Black;
            this.rtb.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.rtb.ExecutingProcess = null;
            this.rtb.Font = new System.Drawing.Font("Courier New", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.rtb.ForeColor = System.Drawing.Color.Lime;
            this.rtb.IgnoreOutputTextMatchingLastInput = true;
            this.rtb.Location = new System.Drawing.Point(5, 19);
            this.rtb.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.rtb.Multiline = true;
            this.rtb.Name = "rtb";
            this.rtb.Size = new System.Drawing.Size(772, 176);
            this.rtb.TabIndex = 0;
            this.rtb.StdoutTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StdoutTextRead);
            this.rtb.StderrTextRead += new ProcessReadWriteUtils.StringReadEventHandler(this.rtb_StderrTextRead);
            // 
            // result
            // 
            this.result.BackColor = System.Drawing.Color.Black;
            this.result.ForeColor = System.Drawing.Color.Lime;
            this.result.Location = new System.Drawing.Point(401, 242);
            this.result.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.result.Name = "result";
            this.result.Size = new System.Drawing.Size(133, 27);
            this.result.TabIndex = 40;
            this.toolTip.SetToolTip(this.result, "Text to send to the standard input stream of running process.");
            // 
            // btnRunCommand
            // 
            this.btnRunCommand.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRunCommand.Location = new System.Drawing.Point(2, 107);
            this.btnRunCommand.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.btnRunCommand.Name = "btnRunCommand";
            this.btnRunCommand.Size = new System.Drawing.Size(373, 33);
            this.btnRunCommand.TabIndex = 26;
            this.btnRunCommand.Text = "Run And Monitor Process";
            this.btnRunCommand.UseVisualStyleBackColor = true;
            this.btnRunCommand.Click += new System.EventHandler(this.btnRunCommand_Click);
            // 
            // txtBxStdin
            // 
            this.txtBxStdin.BackColor = System.Drawing.Color.Black;
            this.txtBxStdin.ForeColor = System.Drawing.Color.Lime;
            this.txtBxStdin.Location = new System.Drawing.Point(2, 189);
            this.txtBxStdin.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.txtBxStdin.Name = "txtBxStdin";
            this.txtBxStdin.Size = new System.Drawing.Size(372, 27);
            this.txtBxStdin.TabIndex = 17;
            this.toolTip.SetToolTip(this.txtBxStdin, "Text to send to the standard input stream of running process.");
            // 
            // btnSendStdinToProcess
            // 
            this.btnSendStdinToProcess.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSendStdinToProcess.Location = new System.Drawing.Point(2, 148);
            this.btnSendStdinToProcess.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.btnSendStdinToProcess.Name = "btnSendStdinToProcess";
            this.btnSendStdinToProcess.Size = new System.Drawing.Size(373, 33);
            this.btnSendStdinToProcess.TabIndex = 27;
            this.btnSendStdinToProcess.Text = "Send Text Standard Input";
            this.btnSendStdinToProcess.UseVisualStyleBackColor = true;
            this.btnSendStdinToProcess.Click += new System.EventHandler(this.btnSendStdinToProcess_Click);
            // 
            // txtBxCmd
            // 
            this.txtBxCmd.BackColor = System.Drawing.Color.Black;
            this.txtBxCmd.ForeColor = System.Drawing.Color.Lime;
            this.txtBxCmd.Location = new System.Drawing.Point(121, 11);
            this.txtBxCmd.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.txtBxCmd.Name = "txtBxCmd";
            this.txtBxCmd.Size = new System.Drawing.Size(254, 27);
            this.txtBxCmd.TabIndex = 30;
            this.txtBxCmd.Text = "cmd.exe";
            this.toolTip.SetToolTip(this.txtBxCmd, "Name of executable program (command only - not the full path)");
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(4, 14);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(96, 20);
            this.label1.TabIndex = 31;
            this.label1.Text = "Command";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(4, 78);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(152, 20);
            this.label2.TabIndex = 33;
            this.label2.Text = "Cmd Arguments";
            // 
            // txtBxArgs
            // 
            this.txtBxArgs.BackColor = System.Drawing.Color.Black;
            this.txtBxArgs.ForeColor = System.Drawing.Color.Lime;
            this.txtBxArgs.Location = new System.Drawing.Point(169, 69);
            this.txtBxArgs.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.txtBxArgs.Name = "txtBxArgs";
            this.txtBxArgs.Size = new System.Drawing.Size(206, 27);
            this.txtBxArgs.TabIndex = 32;
            this.toolTip.SetToolTip(this.txtBxArgs, "Command line arguments to the executable.");
            // 
            // btnClearTextBox
            // 
            this.btnClearTextBox.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnClearTextBox.Location = new System.Drawing.Point(2, 227);
            this.btnClearTextBox.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.btnClearTextBox.Name = "btnClearTextBox";
            this.btnClearTextBox.Size = new System.Drawing.Size(373, 33);
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
            this.txtBxDirectory.Location = new System.Drawing.Point(169, 42);
            this.txtBxDirectory.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.txtBxDirectory.Name = "txtBxDirectory";
            this.txtBxDirectory.Size = new System.Drawing.Size(206, 27);
            this.txtBxDirectory.TabIndex = 34;
            this.toolTip.SetToolTip(this.txtBxDirectory, "Directory path to the command, or blank  (assume in PATH environment variable)");
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(4, 45);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(138, 20);
            this.label3.TabIndex = 35;
            this.label3.Text = "Cmd Directory";
            // 
            // KILL
            // 
            this.KILL.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.KILL.Location = new System.Drawing.Point(0, 268);
            this.KILL.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.KILL.Name = "KILL";
            this.KILL.Size = new System.Drawing.Size(376, 33);
            this.KILL.TabIndex = 39;
            this.KILL.Text = "KILL";
            this.toolTip.SetToolTip(this.KILL, "Clear all input/output text in the Interactive Command Window");
            this.KILL.UseVisualStyleBackColor = true;
            this.KILL.Click += new System.EventHandler(this.KILL_Click);
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
            this.panel1.Location = new System.Drawing.Point(6, 235);
            this.panel1.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(378, 307);
            this.panel1.TabIndex = 41;
            // 
            // BIGTEXT
            // 
            this.BIGTEXT.AutoSize = true;
            this.BIGTEXT.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.BIGTEXT.ForeColor = System.Drawing.Color.OrangeRed;
            this.BIGTEXT.Location = new System.Drawing.Point(803, 96);
            this.BIGTEXT.Name = "BIGTEXT";
            this.BIGTEXT.Size = new System.Drawing.Size(0, 22);
            this.BIGTEXT.TabIndex = 42;
            // 
            // linkLabel1
            // 
            this.linkLabel1.AutoSize = true;
            this.linkLabel1.LinkColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.linkLabel1.Location = new System.Drawing.Point(807, 165);
            this.linkLabel1.Name = "linkLabel1";
            this.linkLabel1.Size = new System.Drawing.Size(146, 20);
            this.linkLabel1.TabIndex = 43;
            this.linkLabel1.TabStop = true;
            this.linkLabel1.Text = "WAIT FOR LINK";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(1124, 233);
            this.Controls.Add(this.linkLabel1);
            this.Controls.Add(this.BIGTEXT);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.groupBox3);
            this.Font = new System.Drawing.Font("Orbitron", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.Manual;
            this.TopMost = true;
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
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
        public System.Windows.Forms.TextBox resultEditor;
        public System.Windows.Forms.TextBox resultNpmI;
        public System.Windows.Forms.Label BIGTEXT;
        public System.Windows.Forms.TextBox nativeExeBuild;
        public System.Windows.Forms.TextBox buildFinalVJS3;
        private System.Windows.Forms.LinkLabel linkLabel1;
    }
}

