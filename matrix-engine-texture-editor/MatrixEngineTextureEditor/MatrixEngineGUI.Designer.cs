
namespace matrix_engine
{
    partial class MatrixEngineGUI
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MatrixEngineGUI));
            this.chromiumWebBrowser1 = new CefSharp.WinForms.ChromiumWebBrowser();
            this.button1 = new System.Windows.Forms.Button();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.startToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.newProjectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loadProjectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.unLoadProjectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.URLTEXT = new System.Windows.Forms.TextBox();
            this.killAllNodeOnMyComputerToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // chromiumWebBrowser1
            // 
            this.chromiumWebBrowser1.ActivateBrowserOnCreation = false;
            this.chromiumWebBrowser1.Location = new System.Drawing.Point(141, 77);
            this.chromiumWebBrowser1.Margin = new System.Windows.Forms.Padding(6, 4, 6, 4);
            this.chromiumWebBrowser1.Name = "chromiumWebBrowser1";
            this.chromiumWebBrowser1.Size = new System.Drawing.Size(841, 546);
            this.chromiumWebBrowser1.TabIndex = 0;
            this.chromiumWebBrowser1.LoadingStateChanged += new System.EventHandler<CefSharp.LoadingStateChangedEventArgs>(this.chromiumWebBrowser1_LoadingStateChanged);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(12, 27);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(123, 43);
            this.button1.TabIndex = 1;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.startToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1030, 24);
            this.menuStrip1.TabIndex = 2;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // startToolStripMenuItem
            // 
            this.startToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newProjectToolStripMenuItem,
            this.loadProjectToolStripMenuItem,
            this.unLoadProjectToolStripMenuItem,
            this.killAllNodeOnMyComputerToolStripMenuItem});
            this.startToolStripMenuItem.Name = "startToolStripMenuItem";
            this.startToolStripMenuItem.Size = new System.Drawing.Size(43, 20);
            this.startToolStripMenuItem.Text = "Start";
            // 
            // newProjectToolStripMenuItem
            // 
            this.newProjectToolStripMenuItem.Name = "newProjectToolStripMenuItem";
            this.newProjectToolStripMenuItem.Size = new System.Drawing.Size(227, 22);
            this.newProjectToolStripMenuItem.Text = "New project";
            this.newProjectToolStripMenuItem.Click += new System.EventHandler(this.newProjectToolStripMenuItem_Click);
            // 
            // loadProjectToolStripMenuItem
            // 
            this.loadProjectToolStripMenuItem.Name = "loadProjectToolStripMenuItem";
            this.loadProjectToolStripMenuItem.Size = new System.Drawing.Size(227, 22);
            this.loadProjectToolStripMenuItem.Text = "Load project";
            this.loadProjectToolStripMenuItem.Click += new System.EventHandler(this.loadProjectToolStripMenuItem_Click);
            // 
            // unLoadProjectToolStripMenuItem
            // 
            this.unLoadProjectToolStripMenuItem.Name = "unLoadProjectToolStripMenuItem";
            this.unLoadProjectToolStripMenuItem.Size = new System.Drawing.Size(227, 22);
            this.unLoadProjectToolStripMenuItem.Text = "UnLoad project";
            this.unLoadProjectToolStripMenuItem.Click += new System.EventHandler(this.unLoadProjectToolStripMenuItem_Click);
            // 
            // URLTEXT
            // 
            this.URLTEXT.BackColor = System.Drawing.Color.Black;
            this.URLTEXT.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.URLTEXT.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.URLTEXT.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.URLTEXT.Location = new System.Drawing.Point(141, 27);
            this.URLTEXT.Multiline = true;
            this.URLTEXT.Name = "URLTEXT";
            this.URLTEXT.Size = new System.Drawing.Size(404, 43);
            this.URLTEXT.TabIndex = 4;
            // 
            // killAllNodeOnMyComputerToolStripMenuItem
            // 
            this.killAllNodeOnMyComputerToolStripMenuItem.Name = "killAllNodeOnMyComputerToolStripMenuItem";
            this.killAllNodeOnMyComputerToolStripMenuItem.Size = new System.Drawing.Size(227, 22);
            this.killAllNodeOnMyComputerToolStripMenuItem.Text = "Kill all node on my computer";
            this.killAllNodeOnMyComputerToolStripMenuItem.Click += new System.EventHandler(this.killAllNodeOnMyComputerToolStripMenuItem_Click);
            // 
            // MatrixEngineGUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 18F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(1030, 636);
            this.Controls.Add(this.URLTEXT);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.chromiumWebBrowser1);
            this.Controls.Add(this.menuStrip1);
            this.Font = new System.Drawing.Font("Orbitron", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Margin = new System.Windows.Forms.Padding(6, 4, 6, 4);
            this.Name = "MatrixEngineGUI";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Matrix-Engine";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.MatrixEngineGUI_Load);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        public CefSharp.WinForms.ChromiumWebBrowser chromiumWebBrowser1;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem startToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem newProjectToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loadProjectToolStripMenuItem;
        public System.Windows.Forms.TextBox URLTEXT;
        public System.Windows.Forms.Button button1;
        private System.Windows.Forms.ToolStripMenuItem unLoadProjectToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem killAllNodeOnMyComputerToolStripMenuItem;
        }
}

