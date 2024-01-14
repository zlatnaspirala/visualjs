﻿using CefSharp;
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

/**
 * Main form for Matrix-Editor GUI Application.
 * @Author Nikola Lukic
 * @Project Matrix-Engine && VisualJS game engine
 * 
 * Important :
 * In matrixEngine GUI used route = public/gui.html
 */
namespace matrix_engine {
    public partial class MatrixEngineGUI : Form {
        public string APP_NAME = "";
        public string LAST_NATIVE_BUILD_CONFIG_PATH = "";
        public string APP_2D_URL = "";
        CmdWindowControlTestApp.MainForm cmdStream;
        CmdWindowControlTestApp.MainForm cmdLoader;
        public CmdWindowControlTestApp.MainForm cmdWebglRun;
        CmdWindowControlTestApp.MainForm cmdWebglHOST;
        CmdWindowControlTestApp.MainForm cmdVJS3EDITOR;
        CmdWindowControlTestApp.MainForm cmdVJS3WATCH;
        public CmdWindowControlTestApp.MainForm cmdKillerProc = null;
        public PackageForm packager;
        ResourceVJS3 resForm;
        ScritpEditor scriptGUIEditor;
        ScritpEditor3d scriptGUIEditor3d;
        ScritpEditorAndroid scritpEditorAndroid;
        NewTextureForm NTP;
        LoadForm LOADFORM;
        FS FSBrowser;
        public String APP_DIR;
        public Boolean NODE_DEP_INSTALLER = false;
        private Boolean FLAG_FIRST_TIME = true;
        int Y_POS = 0;
        private string NO_DEP_TEXT = "No dep library exist, please install deps.";
        private string TEXT_ERROR = "Matrix-engine error msg.";
        public void START(String ARG) {
            APP_DIR = ARG;
            cmdStream = new CmdWindowControlTestApp.MainForm();
            cmdStream.Load += cdmStreamWizardloaded;
            cmdStream.Show();
            //npmadded
            cmdStream.resultNpmI.TextChanged += NPMDONE;
        }

        public void NATIVE_EXE_DONE(object sender, EventArgs e) {
            // EXPORTS
            MessageBox.Show("Windows desktop application builded [matrix-engine.exe] successful.", "Matrix-engine native app builded.", MessageBoxButtons.OK, MessageBoxIcon.Information);
            cmdKillerProc.BIGTEXT.Text = "Copying the new instance to the exports folder.";

            // test maybe baby
            cmdKillerProc.nativeExeBuild.TextChanged -= NATIVE_EXE_DONE;

            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(NO_DEP_TEXT, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            if (cmdKillerProc == null) {
                cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                cmdKillerProc.Load += cmdKillerLoader;
            }

            var APP_NATIVEPATH = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\";
            var APP_NATIVEPATHFILE = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\matrix-engine.exe";

            var APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) {
                MessageBox.Show("No export folder, please wait.", "Matrix-engine create export/ folder.", MessageBoxButtons.OK);
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS);
            }

            if (File.Exists(APP_NATIVEPATHFILE)) {
                // MessageBox.Show("Native build exist, nice!");
                var APP_DIR_TEST_EXPORTS__ = APP_DIR_TEST_EXPORTS + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-") + "win-desktop";
                if (Directory.Exists(APP_DIR_TEST_EXPORTS__) == false) {
                    Directory.CreateDirectory(APP_DIR_TEST_EXPORTS__);
                } else {
                    MessageBox.Show("Export folder exist, wtf...", "Matrix-engine Not handled.", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }
                cmdKillerProc.txtBxStdin.Text = "xcopy /e /k /h /i \"" + Path.GetDirectoryName(APP_NATIVEPATH) + "\" \"" + APP_DIR_TEST_EXPORTS__ + "\\" + "\"";
                cmdKillerProc.btnSendStdinToProcess.PerformClick();
                LAST_NATIVE_BUILD_CONFIG_PATH = APP_DIR_TEST_EXPORTS__;
                packager.NATIVEBuildPATH.Text = LAST_NATIVE_BUILD_CONFIG_PATH;

                cmdKillerProc.LINK.Text = "Saved in " + APP_DIR_TEST_EXPORTS__;
                packager.button1.PerformClick();
                return;
            }
        }

        protected void NPMDONE(object sender, EventArgs e) {
            // fix
            string createCacheFolder = APP_DIR + "\\matrix-engine\\2DTextureEditor\\cache";
            string createCacheFolder2 = APP_DIR + "\\matrix-engine\\2DTextureEditor\\cache\\redraw";
            System.IO.Directory.CreateDirectory(createCacheFolder);
            System.IO.Directory.CreateDirectory(createCacheFolder2);
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
            APP_2D_URL = URLTEXT.Text;
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
            // Default visible false - must be shown
            cmdVJS3EDITOR.Show();
            cmdVJS3WATCH.Show();
            scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME, this);
            scriptGUIEditor.Show();
            scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 60, 25);
            scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            scriptGUIEditor.cmdVJS3WATCH = cmdVJS3WATCH;
            // MAtrixEngine webGL part
            scriptGUIEditor3d = new ScritpEditor3d(APP_DIR, APP_NAME, this);
            scriptGUIEditor3d.Show();
            scriptGUIEditor3d.Location = new Point(this.Size.Width / 100 * 60, 25);
            scriptGUIEditor3d.SCRIPT_SRC.Text = APP_DIR;
            // scritpEditorAndroid new 
            if (scritpEditorAndroid != null && scritpEditorAndroid.IsDisposed == false) {
                scritpEditorAndroid.Show();
            } else {
                scritpEditorAndroid = new ScritpEditorAndroid(APP_DIR, APP_NAME, this);
                scritpEditorAndroid.Show();
                scritpEditorAndroid.Location = new Point(this.Size.Width / 100 * 60, 25);
                scritpEditorAndroid.SCRIPT_SRC.Text = APP_DIR;
            }
            // Resouce form
            resForm = new ResourceVJS3(APP_DIR, this);
            resForm.Show();
            resForm.Location = new Point(0, this.Size.Height / 100 * 65);
            resForm.Size = new Size(this.Size.Width, this.Size.Height / 100 * 35);
            Y_POS = resForm.Location.Y;
            this.hideAllToolStripMenuItem.PerformClick();
        }

        public MatrixEngineGUI(string args) {
            InitializeComponent();
            string URLStart = "https://maximumroulette.com/apps/matrix-engine/query-build.html?u=welcome_gui_editor";
            URLTEXT.Text = URLStart;
            if (args.ToString() != "") {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
            } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }
        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e) { }

        public void buildRes() {
            if (cmdKillerProc == null || cmdKillerProc.IsDisposed) {
                cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            }
            cmdKillerProc.Show();
            cmdKillerProc.txtBxStdin.Text = @"c:";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR + @"\2DTextureEditor";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            cmdKillerProc.txtBxStdin.Text = @"node res.js";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            button1.PerformClick();
        }

        public void buildFinalVisualJS() {
            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(NO_DEP_TEXT, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }
            cmdKillerProc.txtBxStdin.Text = @"c:";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            APP_DIR_TEST = APP_DIR_TEST + @"\2DTextureEditor";
            cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR_TEST;
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            cmdKillerProc.txtBxStdin.Text = @"node build.js";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            button1.PerformClick();
        }

        public void BUILD_VJS3_FINAL(object sender, EventArgs e) {
            // test
            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(NO_DEP_TEXT, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }
            cmdKillerProc.txtBxStdin.Text = @"c:";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            APP_DIR_TEST = APP_DIR_TEST + "2DTextureEditor";
            cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR_TEST;
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            /////
            ///
            var APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) { Directory.CreateDirectory(APP_DIR_TEST_EXPORTS); }
            var APP_DIR_TEST_EXPORTS__ = APP_DIR_TEST_EXPORTS + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-") + "2dcanvas";


            cmdKillerProc.txtBxStdin.Text = "xcopy /e /k /h /i \"" + APP_DIR_TEST + "\" \"" + APP_DIR_TEST_EXPORTS__ + "\\" + "\"";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            packager.webAppExportPath.Text = APP_DIR_TEST_EXPORTS__;
            // MessageBox.Show("Final build for canvas2d code finished! Nice.", "Matrix-engine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
            //
        }
        public void WEB2DEXPORT_READY(object sender, EventArgs e) {
            MessageBox.Show("Final build for canvas2d code finished! Take a look intro exports folder => " + packager.webAppExportPath.Text.ToString(), "Matrix-engine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
            packager.statusBuildVJS3.Text = "Build done.";
            packager.statusBuildVJS3.ForeColor = Color.Green;
            KillProcessAndChildren(cmdKillerProc._PID_);
            cmdKillerProc.Close();
            cmdKillerProc.Dispose();
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
                APP_DIR = APP_DIR_TEST;
                NODE_DEP_INSTALLER = true;
                newProjectToolStripMenuItem.Enabled = false;
            }
            toolTip1.SetToolTip(this.button1, "Manual reload web app.");
            toolTip1.SetToolTip(this.URLTEXT, "Main URL (can be manipulated but general no need for edit).");
        }

        public void cmdKillerLoader(object sender, EventArgs e) { }

        private void cmdWATCHLoader(object sender, EventArgs e) {

            // cmdVJS3WATCH.Size = new Size(this.Size.Width/2, this.Size.Height/5);
            cmdVJS3WATCH.Location = new Point(Location.X + Size.Width / 100 * 55, Location.Y + this.Size.Height / 4);

            cmdVJS3WATCH.txtBxStdin.Text = @"c:";
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            cmdVJS3WATCH.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            // "gui-editor": "watchify ./2DTextureEditor/gui-texture-editor.js -p [esmify --noImplicitAny] -o ./2DTextureEditor/builds/gui.tex.js",
            // In some reason watch not working
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
            // from amtrix engine git pull NOT HANDLED
            StreamReader sr = new StreamReader(TEXTURE_JS_FILE);
            string PACKAGE_CONTENT = sr.ReadToEnd().ToString();
            // from visual studi project static
            // string PACKAGE_CONTENT = matrix_engine.Properties.Resources.gui_texture_editor.ToString();
            // NOT HANDLED
            if (File.Exists(TEXTURE_JS_FILE) != true) {
                File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
            }

            cmdLoader.Location = new Point(Location.X + Size.Width / 100 * 55, Location.Y + 3 * this.Size.Height / 4);

            cmdLoader.txtBxStdin.Text = @"c:";
            cmdLoader.btnSendStdinToProcess.PerformClick();

            cmdLoader.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdLoader.btnSendStdinToProcess.PerformClick();
            // npm run host-for-gui Refer on canvas2d part
            cmdLoader.txtBxStdin.Text = @"npm run host-for-gui";
            cmdLoader.btnSendStdinToProcess.PerformClick();
        }

        private void cdmStreamWizardloaded(object sender, EventArgs e) {
            // Install new instance - for now matrix-engine
            cmdStream.Size = new Size(this.Size.Width / 100 * 90, this.Size.Height / 4);
            cmdStream.Location = new Point(Location.X + this.Size.Width / 100 * 5, Location.Y + this.Size.Height / 4);
            // cmdStream.FormBorderStyle = FormBorderStyle.None;
            // cmdStream.BackColor = Color.FromArgb(205, Color.OrangeRed)
            cmdStream.Text = "Download and install deps library for matrix-engine...";
            cmdStream.BIGTEXT.Text = "Download deps library [matrix engine] please wait...";
            cmdStream.txtBxStdin.Text = @"c:";
            cmdStream.btnSendStdinToProcess.PerformClick();
            cmdStream.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdStream.btnSendStdinToProcess.PerformClick();
            cmdStream.txtBxStdin.Text = @"git clone https://github.com/zlatnaspirala/matrix-engine.git";
            cmdStream.btnSendStdinToProcess.PerformClick();
            cmdStream.txtBxStdin.Text = @"cd matrix-engine";
            cmdStream.btnSendStdinToProcess.PerformClick();
            cmdStream.txtBxStdin.Text = @"npm run install.dep";
            cmdStream.btnSendStdinToProcess.PerformClick();
        }

        private void button1_Click(object sender, EventArgs e) {
            if (APP_2D_URL == "") {
                MessageBox.Show("You have to start the 2d texture editor first", "Matrix-engine", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            URLTEXT.Text = APP_2D_URL;
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
                MessageBox.Show("PLease wait one sec... ", err.ToString());
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
        public static void KillProcessAndChildren(int pid) {
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

                if (cmdWebglRun != null) {
                    KillProcessAndChildren(cmdWebglRun._PID_);
                    cmdWebglRun.Close();
                    cmdWebglRun.Dispose();
                }

                if (cmdWebglHOST != null) {
                    KillProcessAndChildren(cmdWebglHOST._PID_);
                    cmdWebglHOST.Close();
                    cmdWebglHOST.Dispose();
                }

                if (cmdStream != null) {
                    KillProcessAndChildren(cmdStream._PID_);
                    cmdStream.Close();
                    cmdStream.Dispose();
                }

                if (cmdLoader != null) {
                    KillProcessAndChildren(cmdLoader._PID_);
                    cmdLoader.Close();
                    cmdLoader.Dispose();
                }

                if (cmdVJS3EDITOR != null) {
                    KillProcessAndChildren(cmdVJS3EDITOR._PID_);
                    cmdVJS3EDITOR.Close();
                    cmdVJS3EDITOR.Dispose();
                }

                if (cmdVJS3WATCH != null) {
                    KillProcessAndChildren(cmdVJS3WATCH._PID_);
                    cmdVJS3WATCH.Close();
                    cmdVJS3WATCH.Dispose();
                }

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
            if (FSBrowser != null && FSBrowser.IsDisposed == false) {
                FSBrowser.chromiumWebBrowser1.Focus();
                FSBrowser.chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
            }
            if (chromiumWebBrowser1 != null && chromiumWebBrowser1.IsDisposed == false) {
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
                //  MessageBox.Show("You need to run editor first!", "Info", MessageBoxButtons.OK);
            }
            if (cmdKillerProc.IsDisposed == false || cmdKillerProc != null) {
                cmdKillerProc.Hide();
            }
            if (cmdStream.IsDisposed == false || cmdStream != null) {
                cmdStream.Hide();
            }
            if (cmdWebglHOST.IsDisposed == false || cmdWebglHOST != null) {
                cmdWebglHOST.Hide();
            }
        }

        private void showFreeTerminalToolStripMenuItem_Click(object sender, EventArgs e) {
            if (cmdKillerProc == null || cmdKillerProc.IsDisposed) {
                cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                cmdKillerProc.Show();
            } else {
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
               // MessageBox.Show("You need to run editor first!", "Info", MessageBoxButtons.OK);
            }

            if (cmdKillerProc != null && cmdKillerProc.IsDisposed == false) {
                cmdKillerProc.Show();
            }
            if (cmdStream != null && cmdStream.IsDisposed == false) {
                cmdStream.Show();
            }
            if (cmdWebglHOST != null && cmdWebglHOST.IsDisposed == false) {
                cmdWebglHOST.Show();
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
            } catch (Exception) {
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
                scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 60, 25);
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
                Y_POS = Y_POS - 12;
                resForm.Location = new Point(resForm.Location.X, Y_POS);
                if (Y_POS < GetScreen().Height /100 * 67) {
                    timer1.Stop();
                }
            }

        }

        private void resourcesToolStripMenuItem_Click(object sender, EventArgs e) {
            if (resForm != null) {
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

            var APP_DIR_TEST1 = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST1) == false) {
                MessageBox.Show(NO_DEP_TEXT, TEXT_ERROR, MessageBoxButtons.OK);
                return;
            }

            packager = new PackageForm(this);
            packager.Show();
        }

        private void stopEditorToolStripMenuItem_Click(object sender, EventArgs e) {
            // Stop editor
            if (cmdVJS3EDITOR != null) {
                KillProcessAndChildren(cmdVJS3EDITOR._PID_);
                KillProcessAndChildren(cmdVJS3WATCH._PID_);
                MessageBox.Show("Editor stoped!", "MatrixEngine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
            } else {
                // MessageBox.Show("Editor is not active!", "MatrixEngine GUI editor", MessageBoxButtons.OK, MessageBoxIcon.Information);
                APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            }          
        }

        private void eXPORTSToolStripMenuItem_Click(object sender, EventArgs e) {
            var _EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(_EXPORTS)) {
                Directory.Delete(_EXPORTS, recursive: true);
            }
        }

        private void scriptEditormatrixengineAppToolStripMenuItem_Click(object sender, EventArgs e) {
            if (scriptGUIEditor3d == null || scriptGUIEditor3d.IsDisposed == true) {
                scriptGUIEditor3d = new ScritpEditor3d(APP_DIR, APP_NAME, this);
                scriptGUIEditor3d.Show();
                scriptGUIEditor3d.Location = new Point(this.Size.Width / 100 * 60, 25);
                scriptGUIEditor3d.SCRIPT_SRC.Text = APP_DIR;
            } else {
                scriptGUIEditor3d.Show();
            }

        }

        private void runMatrixengineAppToolStripMenuItem_Click(object sender, EventArgs e) {
            if (cmdWebglHOST != null) {
                MessageBox.Show("Matrix-engine [3d part] hosting already runned...", "Matrix-Engine", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            cmdWebglRun = new CmdWindowControlTestApp.MainForm();
            cmdWebglRun.Load += cmdWebGLRunEvent;
            cmdWebglRun.Show();
            cmdWebglRun.result.TextChanged += detectWebglHost;

            cmdWebglHOST = new CmdWindowControlTestApp.MainForm();
            cmdWebglHOST.Load += cmdWebGLHOSTING;
            cmdWebglHOST.Show();
            cmdWebglHOST.result.TextChanged += detectWebglHost;
        }

        private void detectWebglHost(object sender, EventArgs e) {
            MessageBox.Show("Ruuning matrix-engine 3d instance!");
            if (scritpEditorAndroid != null && scritpEditorAndroid.IsDisposed == false) {
                scritpEditorAndroid.Show();
            } else {
                scritpEditorAndroid = new ScritpEditorAndroid(APP_DIR, APP_NAME, this);
                scritpEditorAndroid.Show();
                scritpEditorAndroid.Location = new Point(this.Size.Width / 100 * 60, 25);
                scritpEditorAndroid.SCRIPT_SRC.Text = APP_DIR;
            }

            /*if (scriptGUIEditor != null && scriptGUIEditor.IsDisposed == false) {
                scriptGUIEditor.Show();
            } else {
                scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME, this);
                scriptGUIEditor.Show();
                scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 60, 25);
                scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            }*/

            if (scriptGUIEditor3d != null && scriptGUIEditor3d.IsDisposed == false) {
                scriptGUIEditor3d.Show();
            } else {
                scriptGUIEditor3d = new ScritpEditor3d(APP_DIR, APP_NAME, this);
                scriptGUIEditor3d.Show();
                scriptGUIEditor3d.Location = new Point(this.Size.Width / 100 * 60, 25);
                scriptGUIEditor3d.SCRIPT_SRC.Text = APP_DIR;
            }

            if (cmdWebglHOST != null && cmdWebglHOST.IsDisposed == false) {
                cmdWebglHOST.Hide();
            }

            cmdWebglRun.WindowState = FormWindowState.Minimized;
            button2.PerformClick();
        }
        private void cmdWebGLRunEvent(object sender, EventArgs e) {
            string TEXTURE_JS_FILE = APP_DIR + @"\\gui\\app.js";
            // from amtrix engine git pull NOT HANDLED
            StreamReader sr = new StreamReader(TEXTURE_JS_FILE);
            string PACKAGE_CONTENT = sr.ReadToEnd().ToString();
            // from visual studi project static
            // string PACKAGE_CONTENT = matrix_engine.Properties.Resources.gui_texture_editor.ToString();
            // NOT HANDLED
            if (File.Exists(TEXTURE_JS_FILE) != true) {
                File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
            }

            cmdWebglRun.Location = new Point(Location.X + Size.Width / 100 * 43, Location.Y + 3 * this.Size.Height / 4);
            cmdWebglRun.txtBxStdin.Text = @"c:";
            cmdWebglRun.btnSendStdinToProcess.PerformClick();
            cmdWebglRun.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdWebglRun.btnSendStdinToProcess.PerformClick();
            // npm run host-for-gui Refer on canvas2d part WATCH NOT WORK FOR NOW!
            cmdWebglRun.txtBxStdin.Text = @"npm run build.gui.app";
            cmdWebglRun.btnSendStdinToProcess.PerformClick();

            if (scritpEditorAndroid != null && scritpEditorAndroid.IsDisposed == false) {
                scritpEditorAndroid.Show();
            } else {
                scritpEditorAndroid = new ScritpEditorAndroid(APP_DIR, APP_NAME, this);
                scritpEditorAndroid.Show();
                scritpEditorAndroid.Location = new Point(this.Size.Width / 100 * 60, 25);
                scritpEditorAndroid.SCRIPT_SRC.Text = APP_DIR;
            }

            /*if (scriptGUIEditor != null && scriptGUIEditor.IsDisposed == false) {
                scriptGUIEditor.Show();
            } else {
                scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME, this);
                scriptGUIEditor.Show();
                scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 60, 25);
                scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            }*/

            if (scriptGUIEditor3d != null && scriptGUIEditor3d.IsDisposed == false) {
                scriptGUIEditor3d.Show();
            } else {
                scriptGUIEditor3d = new ScritpEditor3d(APP_DIR, APP_NAME, this);
                scriptGUIEditor3d.Show();
                scriptGUIEditor3d.Location = new Point(this.Size.Width / 100 * 60, 25);
                scriptGUIEditor3d.SCRIPT_SRC.Text = APP_DIR;
            }

        }

        public void testAlreadyHosted(object sender, EventArgs e) {
            MessageBox.Show("Web server already runned", "Matrix-Engine", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void cmdWebGLHOSTING(object sender, EventArgs e) {

            cmdWebglHOST.ADDRESSINUSE.TextChanged += testAlreadyHosted;
            cmdWebglHOST.Location = new Point(Location.X + Size.Width / 100 * 55, Location.Y + 3 * this.Size.Height / 4);
            cmdWebglHOST.txtBxStdin.Text = @"c:";
            cmdWebglHOST.btnSendStdinToProcess.PerformClick();
            cmdWebglHOST.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdWebglHOST.btnSendStdinToProcess.PerformClick();
            cmdWebglHOST.txtBxStdin.Text = @"c:";
            cmdWebglHOST.btnSendStdinToProcess.PerformClick();
            // host root !
            cmdWebglHOST.txtBxStdin.Text = @"npm run host-public";
            cmdWebglHOST.btnSendStdinToProcess.PerformClick();

            /*if (chromiumWebBrowser1 != null) {
                URLTEXT.Text = "http://localhost/public/gui.html";
                chromiumWebBrowser1.LoadUrl("http://localhost/public/gui.html");
            }*/
        }

        private void button2_Click(object sender, EventArgs e) {

            if (chromiumWebBrowser1 != null && chromiumWebBrowser1.IsDisposed == false && chromiumWebBrowser1.Visible == true) {
            
            }
            if (FSBrowser != null && FSBrowser.IsDisposed == false && FSBrowser.chromiumWebBrowser1.IsDisposed == false && FSBrowser.Visible == true) {
                
            }

            if (chromiumWebBrowser1 != null) {
                ClearCache();
                URLTEXT.Text = "http://localhost/public/gui.html";
                chromiumWebBrowser1.LoadUrl("http://localhost/public/gui.html");
            } else {
                if (FSBrowser != null && FSBrowser.IsDisposed == false && FSBrowser.chromiumWebBrowser1.IsDisposed == false && FSBrowser.Visible == true) {
                    ClearCachePopup();
                    URLTEXT.Text = "http://localhost/public/gui.html";
                    FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
                }
            }
        }

        public void webGLFinishBuild(object sender, EventArgs e) {
            // EXPORTS
            MessageBox.Show("JS script builded [build.gui.js] successful.", "Matrix-engine web 3d app builded.", MessageBoxButtons.OK, MessageBoxIcon.Information);
            cmdKillerProc.BIGTEXT.Text = "Copying the new instance to the exports folder.";

            // test maybe baby
            cmdKillerProc.exportedwebgl.TextChanged -= webGLFinishBuild;

            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(NO_DEP_TEXT, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            if (cmdKillerProc == null) {
                cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                cmdKillerProc.Load += cmdKillerLoader;
            }

            var APP_WEBGL_SRC = APP_DIR_TEST + @"\public\";


            var APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) {
                MessageBox.Show("No export folder, please wait.", "Matrix-engine create export/ folder.", MessageBoxButtons.OK);
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS);
            }
            // MessageBox.Show("Native build exist, nice!");
            var APP_DIR_TEST_EXPORTS__ = APP_DIR_TEST_EXPORTS + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-") + "matrix_engine";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS__) == false) {
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS__);
            } else {
                MessageBox.Show("Export folder exist, wtf...", "Matrix-engine Not handled.", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            cmdKillerProc.txtBxStdin.Text = "xcopy /e /k /h /i \"" + Path.GetDirectoryName(APP_WEBGL_SRC) + "\" \"" + APP_DIR_TEST_EXPORTS__ + "\\" + "\"";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            // LAST_NATIVE_BUILD_CONFIG_PATH = APP_DIR_TEST_EXPORTS__;
            packager.webGLBuildPath.Text = APP_DIR_TEST_EXPORTS__;

            cmdKillerProc.LINK.Text = "Saved in " + APP_DIR_TEST_EXPORTS__;
            packager.button1.PerformClick();
            return;
        }

        private void goToMatrixengineSourceToolStripMenuItem_Click(object sender, EventArgs e) {
            var t = "https://github.com/zlatnaspirala/matrix-engine";
            Process.Start("chrome.exe", t);
        }

        private void goToVisualJS3SourceToolStripMenuItem_Click(object sender, EventArgs e) {
            var t = "https://github.com/zlatnaspirala/visualjs";
            Process.Start("chrome.exe", t);
        }

        private void MatrixEngineGUI_FormClosing(object sender, FormClosingEventArgs e) {
            killSubProcess();
        }

        private void URLTEXT_TextChanged(object sender, EventArgs e) {

        }

        private void buildToolStripMenuItem_Click(object sender, EventArgs e) {

        }

        private void aLLDEPSLIBSToolStripMenuItem_Click(object sender, EventArgs e) {
            DialogResult dialogResult = MessageBox.Show("Are you sure to delete all deps libraries ", "Matrix-Engine GUI" , MessageBoxButtons.YesNo , MessageBoxIcon.Warning);
            if (dialogResult == DialogResult.Yes) {
                var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\";
                Directory.Delete(APP_DIR_TEST, true);
            } // else if (dialogResult == DialogResult.No) {}
        }

        private void scriptEditorandroidWrapperToolStripMenuItem_Click(object sender, EventArgs e) {
            if (scritpEditorAndroid != null && scritpEditorAndroid.IsDisposed == false) {
                scritpEditorAndroid.Show();
            } else {
                scritpEditorAndroid = new ScritpEditorAndroid(APP_DIR, APP_NAME, this);
                scritpEditorAndroid.Show();
                scritpEditorAndroid.Location = new Point(this.Size.Width / 100 * 60, 25);
                scritpEditorAndroid.SCRIPT_SRC.Text = APP_DIR;
            }
        }
    }
    
    }

