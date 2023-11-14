
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
            this.killAllNodeOnMyComputerToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.buildToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mATRIXTEXEDITORToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.editorToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.opetEditorModeToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.URLTEXT = new System.Windows.Forms.TextBox();
            this.exitEditorModeToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // chromiumWebBrowser1
            // 
            this.chromiumWebBrowser1.ActivateBrowserOnCreation = false;
            this.chromiumWebBrowser1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.chromiumWebBrowser1.Location = new System.Drawing.Point(0, 24);
            this.chromiumWebBrowser1.Margin = new System.Windows.Forms.Padding(6, 4, 6, 4);
            this.chromiumWebBrowser1.Name = "chromiumWebBrowser1";
            this.chromiumWebBrowser1.Size = new System.Drawing.Size(1283, 573);
            this.chromiumWebBrowser1.TabIndex = 0;
            this.chromiumWebBrowser1.LoadingStateChanged += new System.EventHandler<CefSharp.LoadingStateChangedEventArgs>(this.chromiumWebBrowser1_LoadingStateChanged);
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.Black;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.ForeColor = System.Drawing.Color.Lime;
            this.button1.Location = new System.Drawing.Point(4, 27);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(123, 30);
            this.button1.TabIndex = 1;
            this.button1.Text = "LOAD";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.menuStrip1.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.startToolStripMenuItem,
            this.buildToolStripMenuItem,
            this.editorToolStripMenuItem,
            this.aboutToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1283, 24);
            this.menuStrip1.TabIndex = 2;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // startToolStripMenuItem
            // 
            this.startToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newProjectToolStripMenuItem,
            this.loadProjectToolStripMenuItem,
            this.unLoadProjectToolStripMenuItem,
            this.killAllNodeOnMyComputerToolStripMenuItem,
            this.exitToolStripMenuItem});
            this.startToolStripMenuItem.Name = "startToolStripMenuItem";
            this.startToolStripMenuItem.Size = new System.Drawing.Size(53, 20);
            this.startToolStripMenuItem.Text = "Start";
            // 
            // newProjectToolStripMenuItem
            // 
            this.newProjectToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.android_icon;
            this.newProjectToolStripMenuItem.Name = "newProjectToolStripMenuItem";
            this.newProjectToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.newProjectToolStripMenuItem.Text = "New project";
            this.newProjectToolStripMenuItem.Click += new System.EventHandler(this.newProjectToolStripMenuItem_Click);
            // 
            // loadProjectToolStripMenuItem
            // 
            this.loadProjectToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.android_icon;
            this.loadProjectToolStripMenuItem.Name = "loadProjectToolStripMenuItem";
            this.loadProjectToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.loadProjectToolStripMenuItem.Text = "Load project";
            this.loadProjectToolStripMenuItem.Click += new System.EventHandler(this.loadProjectToolStripMenuItem_Click);
            // 
            // unLoadProjectToolStripMenuItem
            // 
            this.unLoadProjectToolStripMenuItem.Name = "unLoadProjectToolStripMenuItem";
            this.unLoadProjectToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.unLoadProjectToolStripMenuItem.Text = "UnLoad project";
            this.unLoadProjectToolStripMenuItem.Click += new System.EventHandler(this.unLoadProjectToolStripMenuItem_Click);
            // 
            // killAllNodeOnMyComputerToolStripMenuItem
            // 
            this.killAllNodeOnMyComputerToolStripMenuItem.Name = "killAllNodeOnMyComputerToolStripMenuItem";
            this.killAllNodeOnMyComputerToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.killAllNodeOnMyComputerToolStripMenuItem.Text = "Kill all node on my computer  ⚠️";
            this.killAllNodeOnMyComputerToolStripMenuItem.Click += new System.EventHandler(this.killAllNodeOnMyComputerToolStripMenuItem_Click);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.exitToolStripMenuItem.Text = "Exit";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
            // 
            // buildToolStripMenuItem
            // 
            this.buildToolStripMenuItem.Name = "buildToolStripMenuItem";
            this.buildToolStripMenuItem.Size = new System.Drawing.Size(52, 20);
            this.buildToolStripMenuItem.Text = "Build";
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mATRIXTEXEDITORToolStripMenuItem});
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(58, 20);
            this.aboutToolStripMenuItem.Text = "About";
            // 
            // mATRIXTEXEDITORToolStripMenuItem
            // 
            this.mATRIXTEXEDITORToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.android_icon;
            this.mATRIXTEXEDITORToolStripMenuItem.Name = "mATRIXTEXEDITORToolStripMenuItem";
            this.mATRIXTEXEDITORToolStripMenuItem.Size = new System.Drawing.Size(214, 22);
            this.mATRIXTEXEDITORToolStripMenuItem.Text = "MATRIX TEX EDITOR";
            this.mATRIXTEXEDITORToolStripMenuItem.Click += new System.EventHandler(this.mATRIXTEXEDITORToolStripMenuItem_Click);
            // 
            // editorToolStripMenuItem
            // 
            this.editorToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.opetEditorModeToolStripMenuItem,
            this.exitEditorModeToolStripMenuItem});
            this.editorToolStripMenuItem.Name = "editorToolStripMenuItem";
            this.editorToolStripMenuItem.Size = new System.Drawing.Size(58, 20);
            this.editorToolStripMenuItem.Text = "Editor";
            // 
            // opetEditorModeToolStripMenuItem
            // 
            this.opetEditorModeToolStripMenuItem.Name = "opetEditorModeToolStripMenuItem";
            this.opetEditorModeToolStripMenuItem.Size = new System.Drawing.Size(187, 22);
            this.opetEditorModeToolStripMenuItem.Text = "Opet editor mode";
            this.opetEditorModeToolStripMenuItem.Click += new System.EventHandler(this.opetEditorModeToolStripMenuItem_Click);
            // 
            // URLTEXT
            // 
            this.URLTEXT.BackColor = System.Drawing.Color.Black;
            this.URLTEXT.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.URLTEXT.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.URLTEXT.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.URLTEXT.Location = new System.Drawing.Point(134, 29);
            this.URLTEXT.Multiline = true;
            this.URLTEXT.Name = "URLTEXT";
            this.URLTEXT.Size = new System.Drawing.Size(843, 28);
            this.URLTEXT.TabIndex = 4;
            this.URLTEXT.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // exitEditorModeToolStripMenuItem
            // 
            this.exitEditorModeToolStripMenuItem.Name = "exitEditorModeToolStripMenuItem";
            this.exitEditorModeToolStripMenuItem.Size = new System.Drawing.Size(187, 22);
            this.exitEditorModeToolStripMenuItem.Text = "Exit editor mode";
            this.exitEditorModeToolStripMenuItem.Click += new System.EventHandler(this.exitEditorModeToolStripMenuItem_Click);
            // 
            // MatrixEngineGUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 18F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(1283, 597);
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
            this.Text = "Matrix-Engine GUI Texture Editor";
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
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem buildToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem mATRIXTEXEDITORToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem editorToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem opetEditorModeToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitEditorModeToolStripMenuItem;
    }
}

