
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
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MatrixEngineGUI));
            this.chromiumWebBrowser1 = new CefSharp.WinForms.ChromiumWebBrowser();
            this.button1 = new System.Windows.Forms.Button();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.startToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.newProjectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loadProjectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.killAllNodeOnMyComputerToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.makeFinalPackageAndExportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.buildToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.nodeWindowsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.hideAllToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.showAllToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.showFreeTerminalToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.setScreenSizeToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.x512ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.x1024ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.fILLDOCKToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.androidDevicesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.iOSDevicesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.iPhone13Pro390X844ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.iPhoneXR414x896ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.iphoneXS375x812ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.iphoneX275x812ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.useTexWindowToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.showToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.hideClassicTexViewToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.showToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.scriptEditorToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.resourcesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.editorToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.opetEditorModeToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exitEditorModeToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mATRIXTEXEDITORToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exitToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.URLTEXT = new System.Windows.Forms.TextBox();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // chromiumWebBrowser1
            // 
            this.chromiumWebBrowser1.ActivateBrowserOnCreation = false;
            this.chromiumWebBrowser1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.chromiumWebBrowser1.ImeMode = System.Windows.Forms.ImeMode.Hiragana;
            this.chromiumWebBrowser1.Location = new System.Drawing.Point(112, 54);
            this.chromiumWebBrowser1.Margin = new System.Windows.Forms.Padding(0);
            this.chromiumWebBrowser1.Name = "chromiumWebBrowser1";
            this.chromiumWebBrowser1.Size = new System.Drawing.Size(648, 512);
            this.chromiumWebBrowser1.TabIndex = 0;
            this.chromiumWebBrowser1.LoadingStateChanged += new System.EventHandler<CefSharp.LoadingStateChangedEventArgs>(this.chromiumWebBrowser1_LoadingStateChanged);
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.Black;
            this.button1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.ForeColor = System.Drawing.Color.Lime;
            this.button1.Location = new System.Drawing.Point(12, 12);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(74, 28);
            this.button1.TabIndex = 1;
            this.button1.Text = "LOAD";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.menuStrip1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.menuStrip1.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.startToolStripMenuItem,
            this.buildToolStripMenuItem,
            this.editorToolStripMenuItem,
            this.aboutToolStripMenuItem,
            this.exitToolStripMenuItem1});
            this.menuStrip1.Location = new System.Drawing.Point(0, 908);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1563, 24);
            this.menuStrip1.TabIndex = 2;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // startToolStripMenuItem
            // 
            this.startToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newProjectToolStripMenuItem,
            this.loadProjectToolStripMenuItem,
            this.killAllNodeOnMyComputerToolStripMenuItem,
            this.makeFinalPackageAndExportToolStripMenuItem,
            this.exitToolStripMenuItem});
            this.startToolStripMenuItem.Name = "startToolStripMenuItem";
            this.startToolStripMenuItem.Size = new System.Drawing.Size(53, 20);
            this.startToolStripMenuItem.Text = "Start";
            this.startToolStripMenuItem.Click += new System.EventHandler(this.startToolStripMenuItem_Click);
            // 
            // newProjectToolStripMenuItem
            // 
            this.newProjectToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.transparentDark20;
            this.newProjectToolStripMenuItem.Name = "newProjectToolStripMenuItem";
            this.newProjectToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.newProjectToolStripMenuItem.Text = "Install dep [one time]";
            this.newProjectToolStripMenuItem.Click += new System.EventHandler(this.newProjectToolStripMenuItem_Click);
            // 
            // loadProjectToolStripMenuItem
            // 
            this.loadProjectToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.android_icon;
            this.loadProjectToolStripMenuItem.Name = "loadProjectToolStripMenuItem";
            this.loadProjectToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.loadProjectToolStripMenuItem.Text = "Run editor";
            this.loadProjectToolStripMenuItem.Click += new System.EventHandler(this.loadProjectToolStripMenuItem_Click);
            // 
            // killAllNodeOnMyComputerToolStripMenuItem
            // 
            this.killAllNodeOnMyComputerToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.warning;
            this.killAllNodeOnMyComputerToolStripMenuItem.Name = "killAllNodeOnMyComputerToolStripMenuItem";
            this.killAllNodeOnMyComputerToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.killAllNodeOnMyComputerToolStripMenuItem.Text = "Kill all node on my computer  ⚠️";
            this.killAllNodeOnMyComputerToolStripMenuItem.Click += new System.EventHandler(this.killAllNodeOnMyComputerToolStripMenuItem_Click);
            // 
            // makeFinalPackageAndExportToolStripMenuItem
            // 
            this.makeFinalPackageAndExportToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.save;
            this.makeFinalPackageAndExportToolStripMenuItem.Name = "makeFinalPackageAndExportToolStripMenuItem";
            this.makeFinalPackageAndExportToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.makeFinalPackageAndExportToolStripMenuItem.Text = "Make final package and export";
            this.makeFinalPackageAndExportToolStripMenuItem.Click += new System.EventHandler(this.makeFinalPackageAndExportToolStripMenuItem_Click);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.exitRight;
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(282, 22);
            this.exitToolStripMenuItem.Text = "&&Exit";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
            // 
            // buildToolStripMenuItem
            // 
            this.buildToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.nodeWindowsToolStripMenuItem,
            this.setScreenSizeToolStripMenuItem,
            this.useTexWindowToolStripMenuItem,
            this.hideClassicTexViewToolStripMenuItem,
            this.scriptEditorToolStripMenuItem,
            this.resourcesToolStripMenuItem,
            this.toolStripSeparator1});
            this.buildToolStripMenuItem.Name = "buildToolStripMenuItem";
            this.buildToolStripMenuItem.Size = new System.Drawing.Size(55, 20);
            this.buildToolStripMenuItem.Text = "View";
            // 
            // nodeWindowsToolStripMenuItem
            // 
            this.nodeWindowsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.hideAllToolStripMenuItem,
            this.showAllToolStripMenuItem,
            this.showFreeTerminalToolStripMenuItem});
            this.nodeWindowsToolStripMenuItem.Name = "nodeWindowsToolStripMenuItem";
            this.nodeWindowsToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.nodeWindowsToolStripMenuItem.Text = "Node windows";
            // 
            // hideAllToolStripMenuItem
            // 
            this.hideAllToolStripMenuItem.Name = "hideAllToolStripMenuItem";
            this.hideAllToolStripMenuItem.Size = new System.Drawing.Size(202, 22);
            this.hideAllToolStripMenuItem.Text = "Hide all";
            this.hideAllToolStripMenuItem.Click += new System.EventHandler(this.hideAllToolStripMenuItem_Click);
            // 
            // showAllToolStripMenuItem
            // 
            this.showAllToolStripMenuItem.Name = "showAllToolStripMenuItem";
            this.showAllToolStripMenuItem.Size = new System.Drawing.Size(202, 22);
            this.showAllToolStripMenuItem.Text = "Show all";
            this.showAllToolStripMenuItem.Click += new System.EventHandler(this.showAllToolStripMenuItem_Click);
            // 
            // showFreeTerminalToolStripMenuItem
            // 
            this.showFreeTerminalToolStripMenuItem.Name = "showFreeTerminalToolStripMenuItem";
            this.showFreeTerminalToolStripMenuItem.Size = new System.Drawing.Size(202, 22);
            this.showFreeTerminalToolStripMenuItem.Text = "Show free terminal";
            this.showFreeTerminalToolStripMenuItem.Click += new System.EventHandler(this.showFreeTerminalToolStripMenuItem_Click);
            // 
            // setScreenSizeToolStripMenuItem
            // 
            this.setScreenSizeToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.x512ToolStripMenuItem,
            this.x1024ToolStripMenuItem,
            this.fILLDOCKToolStripMenuItem,
            this.androidDevicesToolStripMenuItem,
            this.iOSDevicesToolStripMenuItem});
            this.setScreenSizeToolStripMenuItem.Name = "setScreenSizeToolStripMenuItem";
            this.setScreenSizeToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.setScreenSizeToolStripMenuItem.Text = "Set screen size";
            // 
            // x512ToolStripMenuItem
            // 
            this.x512ToolStripMenuItem.Name = "x512ToolStripMenuItem";
            this.x512ToolStripMenuItem.Size = new System.Drawing.Size(181, 22);
            this.x512ToolStripMenuItem.Text = "512x512";
            this.x512ToolStripMenuItem.Click += new System.EventHandler(this.x512ToolStripMenuItem_Click);
            // 
            // x1024ToolStripMenuItem
            // 
            this.x1024ToolStripMenuItem.Name = "x1024ToolStripMenuItem";
            this.x1024ToolStripMenuItem.Size = new System.Drawing.Size(181, 22);
            this.x1024ToolStripMenuItem.Text = "1024x1024";
            this.x1024ToolStripMenuItem.Click += new System.EventHandler(this.x1024ToolStripMenuItem_Click);
            // 
            // fILLDOCKToolStripMenuItem
            // 
            this.fILLDOCKToolStripMenuItem.Name = "fILLDOCKToolStripMenuItem";
            this.fILLDOCKToolStripMenuItem.Size = new System.Drawing.Size(181, 22);
            this.fILLDOCKToolStripMenuItem.Text = "FILL DOCK";
            this.fILLDOCKToolStripMenuItem.Click += new System.EventHandler(this.fILLDOCKToolStripMenuItem_Click);
            // 
            // androidDevicesToolStripMenuItem
            // 
            this.androidDevicesToolStripMenuItem.Name = "androidDevicesToolStripMenuItem";
            this.androidDevicesToolStripMenuItem.Size = new System.Drawing.Size(181, 22);
            this.androidDevicesToolStripMenuItem.Text = "Android devices";
            // 
            // iOSDevicesToolStripMenuItem
            // 
            this.iOSDevicesToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.iPhone13Pro390X844ToolStripMenuItem,
            this.iPhoneXR414x896ToolStripMenuItem,
            this.iphoneXS375x812ToolStripMenuItem,
            this.iphoneX275x812ToolStripMenuItem});
            this.iOSDevicesToolStripMenuItem.Name = "iOSDevicesToolStripMenuItem";
            this.iOSDevicesToolStripMenuItem.Size = new System.Drawing.Size(181, 22);
            this.iOSDevicesToolStripMenuItem.Text = "iOS devices";
            // 
            // iPhone13Pro390X844ToolStripMenuItem
            // 
            this.iPhone13Pro390X844ToolStripMenuItem.Name = "iPhone13Pro390X844ToolStripMenuItem";
            this.iPhone13Pro390X844ToolStripMenuItem.Size = new System.Drawing.Size(243, 22);
            this.iPhone13Pro390X844ToolStripMenuItem.Text = "iPhone 13 pro 390 x 844";
            this.iPhone13Pro390X844ToolStripMenuItem.Click += new System.EventHandler(this.iPhone13Pro390X844ToolStripMenuItem_Click);
            // 
            // iPhoneXR414x896ToolStripMenuItem
            // 
            this.iPhoneXR414x896ToolStripMenuItem.Name = "iPhoneXR414x896ToolStripMenuItem";
            this.iPhoneXR414x896ToolStripMenuItem.Size = new System.Drawing.Size(243, 22);
            this.iPhoneXR414x896ToolStripMenuItem.Text = "iPhone XR      414x896";
            this.iPhoneXR414x896ToolStripMenuItem.Click += new System.EventHandler(this.iPhoneXR414x896ToolStripMenuItem_Click);
            // 
            // iphoneXS375x812ToolStripMenuItem
            // 
            this.iphoneXS375x812ToolStripMenuItem.Name = "iphoneXS375x812ToolStripMenuItem";
            this.iphoneXS375x812ToolStripMenuItem.Size = new System.Drawing.Size(243, 22);
            this.iphoneXS375x812ToolStripMenuItem.Text = "Iphone XS      375x812";
            this.iphoneXS375x812ToolStripMenuItem.Click += new System.EventHandler(this.iphoneXS375x812ToolStripMenuItem_Click);
            // 
            // iphoneX275x812ToolStripMenuItem
            // 
            this.iphoneX275x812ToolStripMenuItem.Name = "iphoneX275x812ToolStripMenuItem";
            this.iphoneX275x812ToolStripMenuItem.Size = new System.Drawing.Size(243, 22);
            this.iphoneX275x812ToolStripMenuItem.Text = "Iphone 8 Plus     414x736";
            this.iphoneX275x812ToolStripMenuItem.Click += new System.EventHandler(this.iphoneX275x812ToolStripMenuItem_Click);
            // 
            // useTexWindowToolStripMenuItem
            // 
            this.useTexWindowToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.showToolStripMenuItem});
            this.useTexWindowToolStripMenuItem.Name = "useTexWindowToolStripMenuItem";
            this.useTexWindowToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.useTexWindowToolStripMenuItem.Text = "Window browser";
            // 
            // showToolStripMenuItem
            // 
            this.showToolStripMenuItem.Name = "showToolStripMenuItem";
            this.showToolStripMenuItem.Size = new System.Drawing.Size(113, 22);
            this.showToolStripMenuItem.Text = "Show";
            this.showToolStripMenuItem.Click += new System.EventHandler(this.showToolStripMenuItem_Click);
            // 
            // hideClassicTexViewToolStripMenuItem
            // 
            this.hideClassicTexViewToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.showToolStripMenuItem1});
            this.hideClassicTexViewToolStripMenuItem.Name = "hideClassicTexViewToolStripMenuItem";
            this.hideClassicTexViewToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.hideClassicTexViewToolStripMenuItem.Text = "Frame browser";
            // 
            // showToolStripMenuItem1
            // 
            this.showToolStripMenuItem1.Name = "showToolStripMenuItem1";
            this.showToolStripMenuItem1.Size = new System.Drawing.Size(113, 22);
            this.showToolStripMenuItem1.Text = "Show";
            this.showToolStripMenuItem1.Click += new System.EventHandler(this.showToolStripMenuItem1_Click);
            // 
            // scriptEditorToolStripMenuItem
            // 
            this.scriptEditorToolStripMenuItem.Name = "scriptEditorToolStripMenuItem";
            this.scriptEditorToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.scriptEditorToolStripMenuItem.Text = "Script editor";
            this.scriptEditorToolStripMenuItem.Click += new System.EventHandler(this.scriptEditorToolStripMenuItem_Click);
            // 
            // resourcesToolStripMenuItem
            // 
            this.resourcesToolStripMenuItem.Name = "resourcesToolStripMenuItem";
            this.resourcesToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.resourcesToolStripMenuItem.Text = "Resources";
            this.resourcesToolStripMenuItem.Click += new System.EventHandler(this.resourcesToolStripMenuItem_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(185, 6);
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
            // exitEditorModeToolStripMenuItem
            // 
            this.exitEditorModeToolStripMenuItem.Name = "exitEditorModeToolStripMenuItem";
            this.exitEditorModeToolStripMenuItem.Size = new System.Drawing.Size(187, 22);
            this.exitEditorModeToolStripMenuItem.Text = "Exit editor mode";
            this.exitEditorModeToolStripMenuItem.Click += new System.EventHandler(this.exitEditorModeToolStripMenuItem_Click);
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mATRIXTEXEDITORToolStripMenuItem});
            this.aboutToolStripMenuItem.Image = global::matrix_engine.Properties.Resources.logo_test;
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(74, 20);
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
            // exitToolStripMenuItem1
            // 
            this.exitToolStripMenuItem1.Image = global::matrix_engine.Properties.Resources.exitRight;
            this.exitToolStripMenuItem1.Name = "exitToolStripMenuItem1";
            this.exitToolStripMenuItem1.Size = new System.Drawing.Size(92, 20);
            this.exitToolStripMenuItem1.Text = "Quit App";
            this.exitToolStripMenuItem1.Click += new System.EventHandler(this.exitToolStripMenuItem1_Click);
            // 
            // URLTEXT
            // 
            this.URLTEXT.BackColor = System.Drawing.Color.Black;
            this.URLTEXT.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.URLTEXT.Font = new System.Drawing.Font("Orbitron", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.URLTEXT.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.URLTEXT.Location = new System.Drawing.Point(92, 12);
            this.URLTEXT.Multiline = true;
            this.URLTEXT.Name = "URLTEXT";
            this.URLTEXT.Size = new System.Drawing.Size(728, 28);
            this.URLTEXT.TabIndex = 4;
            this.URLTEXT.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // timer1
            // 
            this.timer1.Interval = 1;
            this.timer1.Tick += new System.EventHandler(this.SHOW_RES_FORM);
            // 
            // toolTip1
            // 
            this.toolTip1.ToolTipIcon = System.Windows.Forms.ToolTipIcon.Info;
            // 
            // MatrixEngineGUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 18F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(1563, 932);
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
            this.Text = "Matrix-Engine GUI Texture Editor ver 1.0.0";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.MinimumSizeChanged += new System.EventHandler(this.MatrixEngineGUI_MinimumSizeChanged);
            this.Load += new System.EventHandler(this.MatrixEngineGUI_Load);
            this.Resize += new System.EventHandler(this.MatrixEngineGUI_Resize);
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
        private System.Windows.Forms.ToolStripMenuItem killAllNodeOnMyComputerToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem buildToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem mATRIXTEXEDITORToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem editorToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem opetEditorModeToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitEditorModeToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem nodeWindowsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem hideAllToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem showAllToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem showFreeTerminalToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem setScreenSizeToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem x512ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem x1024ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem fILLDOCKToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem androidDevicesToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem iOSDevicesToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem iPhone13Pro390X844ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem iPhoneXR414x896ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem iphoneXS375x812ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem iphoneX275x812ToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem useTexWindowToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem showToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem hideClassicTexViewToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem scriptEditorToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem showToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem resourcesToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.ToolTip toolTip1;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem makeFinalPackageAndExportToolStripMenuItem;
    }
}

