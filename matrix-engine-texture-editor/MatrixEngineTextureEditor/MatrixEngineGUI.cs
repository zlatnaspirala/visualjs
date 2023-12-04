using CefSharp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class MatrixEngineGUI : Form {
        public string APP_NAME = "";
        CmdWindowControlTestApp.MainForm cmdStream;
        CmdWindowControlTestApp.MainForm cmdLoader;
        CmdWindowControlTestApp.MainForm cmdVJS3EDITOR;
        CmdWindowControlTestApp.MainForm cmdVJS3WATCH;
        public CmdWindowControlTestApp.MainForm cmdKillerProc = null;
        public PackageForm packager;
        ResourceVJS3 resForm;
        ScritpEditor scriptGUIEditor;
        NewTextureForm NTP;
        LoadForm LOADFORM;
        FS FSBrowser;
        public String APP_DIR;
        public Boolean NODE_DEP_INSTALLER = false;
        private Boolean FLAG_FIRST_TIME = true;
        int Y_POS = 0;

        public void START(String ARG) {
            APP_DIR = ARG;
            cmdStream = new CmdWindowControlTestApp.MainForm();
            cmdStream.Load += cdmStreamWizardloaded;
            cmdStream.Show();
            //npmadded
            cmdStream.resultNpmI.TextChanged += NPMDONE;
        }
        protected void NPMDONE(object sender, EventArgs e) {
            Thread.Sleep(400);
            cmdStream.Close();
            cmdStream.Dispose();
            MessageBox.Show("Deps library installed! Now you can run editor.", "Matrix-engine cloned.", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        public void LOAD(String ARG) {
            APP_DIR = ARG;
            setupEditorConfig();
            setupResConfig();
            cmdLoader = new CmdWindowControlTestApp.MainForm();
            cmdLoader.Load += cmdLoaderLoader;
            cmdLoader.Show();
            cmdLoader.result.TextChanged += detectHost;
        }

        private void detectHost(object sender, EventArgs e) {
            string navUrl = cmdLoader.result.Text;
            URLTEXT.Text = navUrl + "/gui.html";
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Load(URLTEXT.Text);
            }
            if (FSBrowser != null) {
                FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
            }
            // run from hare
            runWatchAndEditor();
        }

        private void detectEditorRunStatus(object sender, EventArgs e) {
            string navUrl = cmdLoader.result.Text;
            URLTEXT.Text = navUrl + "\\gui.html";

            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Load(URLTEXT.Text);
            }

            if (FSBrowser != null) {
                FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
            }
        }

        public void runWatchAndEditor() {
            if (cmdKillerProc == null) {
                cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                cmdKillerProc.Load += cmdKillerLoader;
            }
            // cmdKillerProc.Show();
            // Hosting runs now 
            cmdVJS3EDITOR = new CmdWindowControlTestApp.MainForm();
            cmdVJS3EDITOR.Load += cmdEDITORLoader;
            cmdVJS3WATCH = new CmdWindowControlTestApp.MainForm();
            cmdVJS3WATCH.Load += cmdWATCHLoader;
            // default visible non
            cmdVJS3EDITOR.Show();
            cmdVJS3WATCH.Show();
            scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME, this);
            scriptGUIEditor.Show();
            scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 65, 20);
            scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            scriptGUIEditor.cmdVJS3WATCH = cmdVJS3WATCH;
            // Res
            resForm = new ResourceVJS3(APP_DIR, this);
            resForm.Show();
            resForm.Location = new Point(0, this.Size.Height / 100 * 65);
            resForm.Size = new Size(this.Size.Width, this.Size.Height / 100 * 35);
            Y_POS = resForm.Location.Y;
            this.hideAllToolStripMenuItem.PerformClick();
        }

        public MatrixEngineGUI(string args) {
            InitializeComponent();
            string URLStart = "https://maximumroulette.com/apps/matrix-engine/examples-build.html";
            URLTEXT.Text = URLStart;
            if (args.ToString() != "") {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
                // FSBrowser.chromiumWebBrowser1.LoadUrl(URLStart);
            } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                // FSBrowser.chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }
        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e) {}

        public void buildRes() {
            cmdKillerProc.Show();
            cmdKillerProc.txtBxStdin.Text = @"c:";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

            cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR + @"\2DTextureEditor";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

            cmdKillerProc.txtBxStdin.Text = @"node res.js";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

            button1.PerformClick();
            //cmdKillerProc.txtBxStdin.Text = @"npm run gui-editor";
            //cmdKillerProc.btnSendStdinToProcess.PerformClick();
        }

        public void fixPaths() {
            // SOLUTION TWO - NOT IN USE FOR NOW
            cmdKillerProc.Show();
            cmdKillerProc.txtBxStdin.Text = @"c:";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

            cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR + @"\2DTextureEditor";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

            cmdKillerProc.txtBxStdin.Text = @"node install-paths.js";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
        }

        private void setupEditorConfig() {
            string TEXTURE_JS_FILE = APP_DIR + @"\\2DTextureEditor\\editor.js";
            string FORNODEPATH = APP_DIR.Replace(@"\", @"//");
            string PATH_ = FORNODEPATH + @"2DTextureEditor//";
            StreamReader sr = new StreamReader(TEXTURE_JS_FILE);
            string PACKAGE_CONTENT = sr.ReadToEnd().ToString();
            sr.Close();
            PACKAGE_CONTENT = PACKAGE_CONTENT.Replace("<PATH_OF_NODE_APP>", PATH_);
            PACKAGE_CONTENT = PACKAGE_CONTENT.Replace("<PATH_OF_WWW>", PATH_);
            File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
        }

        private void setupResConfig() {
            string TEXTURE_JS_FILE = APP_DIR + @"\\2DTextureEditor\\config.js";
            string FORNODEPATH = APP_DIR.Replace(@"\", @"//");
            string PATH_ = FORNODEPATH + @"2DTextureEditor//";
            StreamReader sr = new StreamReader(TEXTURE_JS_FILE);
            string PACKAGE_CONTENT = sr.ReadToEnd().ToString();
            sr.Close();
            PACKAGE_CONTENT = PACKAGE_CONTENT.Replace("<PATH_OF_NODE_APP>", PATH_);
            PACKAGE_CONTENT = PACKAGE_CONTENT.Replace("<PATH_OF_WWW>", PATH_);
            File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
        }

        private void MatrixEngineGUI_Load(object sender, EventArgs e) {

            AppDomain.CurrentDomain.ProcessExit += new EventHandler(OnProcessExit);

            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == true) {
                NODE_DEP_INSTALLER = true;
                newProjectToolStripMenuItem.Enabled = false;
            }
            toolTip1.SetToolTip(this.button1, "Manual reload web part.");
            toolTip1.SetToolTip(this.URLTEXT, "Main URL (can be manipulated but general no need for edit).");
        }

        private void cmdKillerLoader(object sender, EventArgs e) { }

        private void cmdWATCHLoader(object sender, EventArgs e) {

            // cmdVJS3WATCH.Size = new Size(this.Size.Width/2, this.Size.Height/5);
            cmdVJS3WATCH.Location = new Point(Location.X + Size.Width / 100*55, Location.Y + this.Size.Height / 4);

            cmdVJS3WATCH.txtBxStdin.Text = @"c:";
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            cmdVJS3WATCH.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            // "gui-editor": "watchify ./2DTextureEditor/gui-texture-editor.js -p [esmify --noImplicitAny] -o ./2DTextureEditor/builds/gui.tex.js",
            cmdVJS3WATCH.txtBxStdin.Text = @"npm run gui-editor-watch";
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

        }

        private void cmdEDITORLoader(object sender, EventArgs e) {
            cmdVJS3EDITOR.resultEditor.TextChanged += detectEditorRunStatus;
            cmdVJS3EDITOR.Location = new Point(Location.X + Size.Width / 100 * 55, Location.Y + 2 * this.Size.Height / 4);

            cmdVJS3EDITOR.txtBxStdin.Text = @"c:";
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();

            cmdVJS3EDITOR.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();

            cmdVJS3EDITOR.txtBxStdin.Text = @"npm run te";
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();
        }

        private void cmdLoaderLoader(object sender, EventArgs e) {
            string TEXTURE_JS_FILE = APP_DIR + @"\\2DTextureEditor\\gui-texture-editor.js";
            // from amtrix engine git pull
            StreamReader sr = new StreamReader(TEXTURE_JS_FILE);
            string PACKAGE_CONTENT = sr.ReadToEnd().ToString();
            // from visual studi project static
            // string PACKAGE_CONTENT = matrix_engine.Properties.Resources.gui_texture_editor.ToString();

            if (File.Exists(TEXTURE_JS_FILE) != true) {
                File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
            }

            cmdLoader.Location = new Point(Location.X + Size.Width / 100 * 55, Location.Y + 3 * this.Size.Height / 4);

            cmdLoader.txtBxStdin.Text = @"c:";
            cmdLoader.btnSendStdinToProcess.PerformClick();

            cmdLoader.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdLoader.btnSendStdinToProcess.PerformClick();

            cmdLoader.txtBxStdin.Text = @"npm run host-for-gui";
            cmdLoader.btnSendStdinToProcess.PerformClick();

        }

        private void cdmStreamWizardloaded(object sender, EventArgs e) {
            // Install new instance - for now matrix-engine
            cmdStream.Size = new Size(this.Size.Width, this.Size.Height / 4);
            cmdStream.Location = new Point(Location.X, Location.Y);
        
            cmdStream.txtBxStdin.Text = @"c:";
            cmdStream.btnSendStdinToProcess.PerformClick();
            
            cmdStream.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"git clone https://github.com/zlatnaspirala/matrix-engine.git";
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"cd matrix-engine";
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"npm i";
            cmdStream.btnSendStdinToProcess.PerformClick();
        }

        private void button1_Click(object sender, EventArgs e) {
            if (FLAG_FIRST_TIME == true) {
                FLAG_FIRST_TIME = false;
                chromiumWebBrowser1.LoadUrl(URLTEXT.Text);

                if (FSBrowser != null && FSBrowser.IsDisposed == false && FSBrowser.chromiumWebBrowser1.IsDisposed == false && FSBrowser.Visible == true) {
                    FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
                }
            } else {
                // Directory.Delete(cacheDirBase + "\\blob_storage", true);
                if (chromiumWebBrowser1 != null && chromiumWebBrowser1.IsDisposed == false && chromiumWebBrowser1.Visible == true) {
                    ClearCache();
                }
                if (FSBrowser != null && FSBrowser.IsDisposed == false && FSBrowser.chromiumWebBrowser1.IsDisposed == false && FSBrowser.Visible == true) {
                    ClearCachePopup();
                }
            }
        }

        private async void ClearCache() {
            try {
                using (var devToolsClient = chromiumWebBrowser1.GetDevToolsClient()) {
                var response = await devToolsClient.Network.ClearBrowserCacheAsync();
                chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
                }
            } catch (Exception err) {
                MessageBox.Show("ERROR IN CLEAR CACHE [chromiumWebBrowser1]", err.ToString());
            }
        }

        private async void ClearCachePopup() {
            try {
                using (var devToolsClient = FSBrowser.chromiumWebBrowser1.GetDevToolsClient()) {
                    var response = await devToolsClient.Network.ClearBrowserCacheAsync();
                    FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
                }
            } catch (Exception err) {
                MessageBox.Show( "PLease wait one sec... ", err.ToString());
                Thread.Sleep(1000);
                using (var devToolsClient = FSBrowser.chromiumWebBrowser1.GetDevToolsClient()) {
                    var response = await devToolsClient.Network.ClearBrowserCacheAsync();
                    FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
                }
                

            }
        }

        private void newProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            NTP = new NewTextureForm(this);
            NTP.Show();
        }

        private void loadProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            var APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\" + @"\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR)) {
                LOADFORM = new LoadForm(this);
                LOADFORM.Show();
            } else {
                MessageBox.Show("No dep library! Please install deps.", "Matrix-Engine GUI Editor warn msg.", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void unLoadProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            killSubProcess();
        }

        private void killAllNodeOnMyComputerToolStripMenuItem_Click(object sender, EventArgs e) {
            killNODEProcess();
        }

        public void killNODEProcess() {
            if (cmdKillerProc != null) {
                cmdKillerProc.txtBxStdin.Text = @"taskkill /im node.exe /T /F";
                cmdKillerProc.btnSendStdinToProcess.PerformClick();
            } else {
                //MessageBox.Show("Nothing for dispose!");
            }
        }

        /// <summary>
        /// Kill a process, and all of its children, grandchildren, etc.
        /// Also build res and used like free terminal!
        /// </summary>
        /// <param name="pid">Process ID.</param>
        private static void KillProcessAndChildren(int pid) {
            // Cannot close 'system idle process'.
            if (pid == 0) {
                return;
            }
            ManagementObjectSearcher searcher = new ManagementObjectSearcher
                    ("Select * From Win32_Process Where ParentProcessID=" + pid);
            ManagementObjectCollection moc = searcher.Get();
            foreach (ManagementObject mo in moc) {
                KillProcessAndChildren(Convert.ToInt32(mo["ProcessID"]));
            }
            try {
                Process proc = Process.GetProcessById(pid);
                proc.Kill();
            } catch (ArgumentException) {
                // Process already exited.
            }
        }

        public void killSubProcess() {
            try {

                if (cmdVJS3EDITOR == null) {
                    return;
                }
                KillProcessAndChildren(cmdVJS3EDITOR._PID_);
                KillProcessAndChildren(cmdVJS3WATCH._PID_);
                KillProcessAndChildren(cmdLoader._PID_);
                if (cmdStream != null) {
                    cmdStream.Close();
                    cmdStream.Dispose();
                }
                cmdLoader.Close();
                cmdLoader.Dispose();
                cmdVJS3EDITOR.Close();
                cmdVJS3EDITOR.Dispose();
                cmdVJS3WATCH.Close();
                cmdVJS3WATCH.Dispose();
            } catch (Exception err) { }
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e) {
            killSubProcess();
            Application.Exit();
            // force error hot fix 
            // cmdVJS3EDITOR.Show();
        }

        void OnProcessExit(object sender, EventArgs e) {
            killSubProcess();
            // Console.WriteLine("I'm out of here!");
        }

        private void mATRIXTEXEDITORToolStripMenuItem_Click(object sender, EventArgs e) {
            About about_ = new About();
            about_.Show();
        }

        private void opetEditorModeToolStripMenuItem_Click(object sender, EventArgs e) {
            KeyEvent k = new KeyEvent();
            k.FocusOnEditableField = true;
            k.WindowsKeyCode = (int)Keys.F4;
            k.Modifiers = CefEventFlags.None;
            k.Type = KeyEventType.KeyDown;
            k.IsSystemKey = false;
            if (FSBrowser != null) {
              FSBrowser.chromiumWebBrowser1.Focus();
              FSBrowser.chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
            }
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Focus();
                chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
            }
        }

        private void exitEditorModeToolStripMenuItem_Click(object sender, EventArgs e) {
            MessageBox.Show("For now you need to exit EDITOR MODE from web part right click context menu.", "MatrixEngine Texture Editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void hideAllToolStripMenuItem_Click(object sender, EventArgs e) {
            if (cmdLoader != null && cmdVJS3EDITOR != null && cmdVJS3WATCH != null) {
                cmdLoader.Hide();
                cmdVJS3EDITOR.Hide();
                cmdVJS3WATCH.Hide();
            } else {
                MessageBox.Show("You need to run editor first!", "Info", MessageBoxButtons.OK);
            }
        }

        private void showFreeTerminalToolStripMenuItem_Click(object sender, EventArgs e) {
            if (cmdKillerProc != null) {
                cmdKillerProc.Show();
            }
        }
          
        private void x512ToolStripMenuItem_Click(object sender, EventArgs e) {
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Dock = DockStyle.None;
                chromiumWebBrowser1.Width = 512;
                chromiumWebBrowser1.Height = 512;
                chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10);
            }
            if (FSBrowser != null) {
                FSBrowser.Text = @"PowerOf2 [" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
                FSBrowser.Size = new Size(512, 512);
            }
            button1.PerformClick();
        }

        private void x1024ToolStripMenuItem_Click(object sender, EventArgs e) {
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
                chromiumWebBrowser1.Dock = DockStyle.None;
                chromiumWebBrowser1.Width = 1024;
                chromiumWebBrowser1.Height = 1024;
            }
            if (FSBrowser != null) {
                FSBrowser.Size = new Size(1024, 1024);
                FSBrowser.Text = @"PowerOf2 [" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            }
            button1.PerformClick();
        }

        private void iPhone13Pro390X844ToolStripMenuItem_Click(object sender, EventArgs e) {
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Dock = DockStyle.None;
                chromiumWebBrowser1.Width = 390;
                chromiumWebBrowser1.Height = 844;
                chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            }
            if (FSBrowser != null) {
                // FSBrowser.chromiumWebBrowser1.Dock = DockStyle.None;
                FSBrowser.Size = new Size(390, 844);
                // FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
                FSBrowser.Text = @"Device: iPhone13Pro[" + FSBrowser.chromiumWebBrowser1.Width + "x" + FSBrowser.chromiumWebBrowser1.Height + "]";
            }
            button1.PerformClick();
        }

        private void fILLDOCKToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.Fill;
        }

        private void showAllToolStripMenuItem_Click(object sender, EventArgs e) {
            if (cmdLoader != null && cmdVJS3EDITOR != null && cmdVJS3WATCH != null) {
                cmdLoader.Show();
                cmdVJS3EDITOR.Show();
                cmdVJS3WATCH.Show();
            } else {
                MessageBox.Show("You need to run editor first!", "Info", MessageBoxButtons.OK);
            }
        }

        private void showToolStripMenuItem_Click(object sender, EventArgs e) {
            try {
                if (chromiumWebBrowser1 != null) {
                    chromiumWebBrowser1.Hide();
                }

                if (FSBrowser != null && FSBrowser.IsDisposed == false) {
                    FSBrowser.Show();
                    button1.PerformClick();
                } else {
                    FSBrowser = new FS();
                    FSBrowser.Show();
                    button1.PerformClick();
                }

            } catch (Exception err) {
                FSBrowser = new FS();
                FSBrowser.Show();
                button1.PerformClick();
            }
        }

        private void iPhoneXR414x896ToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 414;
            chromiumWebBrowser1.Height = 896;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            if (FSBrowser != null) {
                FSBrowser.Text = @"Device: iphoneXR[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
                FSBrowser.Size = new Size(414, 896);
                FSBrowser.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            }
            button1.PerformClick();
        }

        private void iphoneXS375x812ToolStripMenuItem_Click(object sender, EventArgs e) {
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Dock = DockStyle.None;
                chromiumWebBrowser1.Width = 375;
                chromiumWebBrowser1.Height = 812;
                chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            }
            if (FSBrowser != null) {
                FSBrowser.Text = @"Device: iphoneXS[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
                FSBrowser.Size = new Size(375, 812);
                FSBrowser.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 3);
            }
            button1.PerformClick();
        }

        private void iphoneX275x812ToolStripMenuItem_Click(object sender, EventArgs e) {
            if (chromiumWebBrowser1 != null) {
                chromiumWebBrowser1.Dock = DockStyle.None;
                chromiumWebBrowser1.Width = 275;
                chromiumWebBrowser1.Height = 812;
                chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            }
            if (FSBrowser != null) {
                FSBrowser.Text = @"Device: iphoneX[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
                FSBrowser.Size = new Size(375, 812);
                FSBrowser.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            }
            button1.PerformClick();
        }

        private void scriptEditorToolStripMenuItem_Click(object sender, EventArgs e) {
            if (scriptGUIEditor != null && scriptGUIEditor.IsDisposed == false) {
                scriptGUIEditor.Show();
            } else {
                scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME, this);
                scriptGUIEditor.Show();
                scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 65, 20);
                scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            }
        }

        private void showToolStripMenuItem1_Click(object sender, EventArgs e) {
            try {
                FSBrowser.Close();
                if (chromiumWebBrowser1 != null) {
                    chromiumWebBrowser1.Show();
                }
            } catch (Exception err) {   }
        }

        public Rectangle GetScreen() {
            return Screen.FromControl(this).Bounds;
        }

        
        private void SHOW_RES_FORM(object sender, EventArgs e) {
            if (resForm != null && resForm.IsDisposed == false) {
                Y_POS = Y_POS - 10;
                resForm.Location = new Point(resForm.Location.X, Y_POS);
                if (Y_POS < GetScreen().Height /100 * 65) {
                    timer1.Stop();
                }
            }

        }

        private void resourcesToolStripMenuItem_Click(object sender, EventArgs e) {
            if (resForm != null && resForm.IsDisposed == false) {
                // resForm.Show();
                Y_POS = resForm.Location.Y;
                timer1.Start();
            }
        }

        private void startToolStripMenuItem_Click(object sender, EventArgs e) {

        }

        private void MatrixEngineGUI_MinimumSizeChanged(object sender, EventArgs e) {
           // 
        }

        private void MatrixEngineGUI_Resize(object sender, EventArgs e) {
            if (WindowState == FormWindowState.Minimized) {
                if (resForm != null) {
                    resForm.Hide();
                }
                if (scriptGUIEditor != null) {
                    scriptGUIEditor.Hide();
                }
            } else if (WindowState == FormWindowState.Maximized) {
                if (resForm != null) {
                    resForm.Show();
                }
                if (scriptGUIEditor != null) {
                    scriptGUIEditor.Show();
                }
            }
        }

        private void exitToolStripMenuItem1_Click(object sender, EventArgs e) {
            killSubProcess();
            Application.Exit();
        }

        private void makeFinalPackageAndExportToolStripMenuItem_Click(object sender, EventArgs e) {
            packager = new PackageForm(this);
            packager.Show();
        }

        private void stopEditorToolStripMenuItem_Click(object sender, EventArgs e) {
            // Stop editor
            // cmdVJS3EDITOR._PID_
            if (cmdVJS3EDITOR != null) {
                KillProcessAndChildren(cmdVJS3EDITOR._PID_);
                KillProcessAndChildren(cmdVJS3WATCH._PID_);
                MessageBox.Show("Editor stoped!", "MatrixEngine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
            } else {
                MessageBox.Show("Editor is not active!", "MatrixEngine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }          
        }
    }
}
