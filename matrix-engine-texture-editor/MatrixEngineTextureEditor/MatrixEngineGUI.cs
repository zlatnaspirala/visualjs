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
        CmdWindowControlTestApp.MainForm cmdKillerProc;
        ScritpEditor scriptGUIEditor;
        NewTextureForm NTP;
        LoadForm LOADFORM;
        FS FSBrowser;
        public String APP_DIR;
        public Boolean NODE_DEP_INSTALLER = false;
        private Boolean FLAG_FIRST_TIME = true;

        public void START(String ARG) {
            APP_DIR = ARG;
            cmdStream = new CmdWindowControlTestApp.MainForm();
            cmdStream.Load += cdmStreamWizardloaded;
            cmdStream.Show();
        }

        public void LOAD(String ARG) {
            APP_DIR = ARG;
            setupEditorConfig();
            cmdLoader = new CmdWindowControlTestApp.MainForm();
            cmdLoader.Load += cmdLoaderLoader;
            cmdLoader.Show();
            cmdLoader.result.TextChanged += detectHost;
        }


        private void detectHost(object sender, EventArgs e) {
            string navUrl = cmdLoader.result.Text;
            URLTEXT.Text = navUrl + "/gui.html";
            chromiumWebBrowser1.Load(URLTEXT.Text);
            FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
            // run from hare
            runWatchAndEditor();
        }

        private void detectEditorRunStatus(object sender, EventArgs e) {
            string navUrl = cmdLoader.result.Text;
            URLTEXT.Text = navUrl + "\\gui.html";
            chromiumWebBrowser1.Load(URLTEXT.Text);
            FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
        }

        public void runWatchAndEditor() {
            cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            cmdKillerProc.Load += cmdKillerLoader;
            // cmdKillerProc.Show();
            // Hosting runs now 
            cmdVJS3EDITOR = new CmdWindowControlTestApp.MainForm();
            cmdVJS3EDITOR.Load += cmdEDITORLoader;
            cmdVJS3WATCH = new CmdWindowControlTestApp.MainForm();
            cmdVJS3WATCH.Load += cmdWATCHLoader;
            // default visible non
            cmdVJS3EDITOR.Show();
            cmdVJS3WATCH.Show();
            scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME);
            scriptGUIEditor.Show();
            scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 65, 20);
            scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
        }

        public MatrixEngineGUI(string args) {
            InitializeComponent();
            string URLStart = "https://maximumroulette.com/apps/matrix-engine/examples-build.html";
            URLTEXT.Text = URLStart;

            FSBrowser = new FS();
            FSBrowser.Location = new Point(this.Size.Width / 4 * 3, 50);
            FSBrowser.Show();

            if (args.ToString() != "") {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
                FSBrowser.chromiumWebBrowser1.LoadUrl(URLStart);
            } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                FSBrowser.chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }
        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e) {

        }

        private void setupEditorConfig () {
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

        private void MatrixEngineGUI_Load(object sender, EventArgs e) {

            if (Directory.Exists("matrixengine")) {
                NODE_DEP_INSTALLER = true;
            }
            
        }

        private void cmdKillerLoader(object sender, EventArgs e) {
            
        }

        private void cmdWATCHLoader(object sender, EventArgs e) {

            // cmdVJS3WATCH.Size = new Size(this.Size.Width/2, this.Size.Height/5);
            cmdVJS3WATCH.Location = new Point(Location.X + Size.Width / 100*65, Location.Y + this.Size.Height / 4);

            cmdVJS3WATCH.txtBxStdin.Text = @"c:";
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            cmdVJS3WATCH.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

            // "gui-editor": "watchify ./2DTextureEditor/gui-texture-editor.js -p [esmify --noImplicitAny] -o ./2DTextureEditor/builds/gui.tex.js",
            cmdVJS3WATCH.txtBxStdin.Text = @"npm run gui-editor";
            cmdVJS3WATCH.btnSendStdinToProcess.PerformClick();

        }

        private void cmdEDITORLoader(object sender, EventArgs e) {
            cmdVJS3EDITOR.resultEditor.TextChanged += detectEditorRunStatus;
            cmdVJS3EDITOR.Location = new Point(Location.X + Size.Width / 100 * 65, Location.Y + 2 * this.Size.Height / 4);

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

            cmdLoader.Location = new Point(Location.X + Size.Width / 100 * 65, Location.Y + 3 * this.Size.Height / 4);

            cmdLoader.txtBxStdin.Text = @"c:";
            cmdLoader.btnSendStdinToProcess.PerformClick();

            cmdLoader.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdLoader.btnSendStdinToProcess.PerformClick();

            cmdLoader.txtBxStdin.Text = @"npm run host-for-gui";
            cmdLoader.btnSendStdinToProcess.PerformClick();

        }

        private void cdmStreamWizardloaded(object sender, EventArgs e) {
            // Install new instance - for now matrix-engine
            cmdStream.Size = new Size(this.Size.Width, this.Size.Height / 3);
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
                FSBrowser.chromiumWebBrowser1.LoadUrl(URLTEXT.Text);
            } else {
                // Directory.Delete(cacheDirBase + "\\blob_storage", true);
                // Directory.Delete(cacheDirBase + "\\Cache", true);
                // Directory.Delete(cacheDirBase + "\\Code Cache", true);
                // Directory.Delete(cacheDirBase + "\\GPUCache", true);
                // Directory.Delete(cacheDirBase + "\\Local Storage", true);
                // Directory.Delete(cacheDirBase + "\\Session Storage", true);
                if (chromiumWebBrowser1 != null && chromiumWebBrowser1.IsDisposed == false) { chromiumWebBrowser1.Reload(true); }
                if (FSBrowser.IsDisposed == false && FSBrowser.chromiumWebBrowser1.IsDisposed == false) { FSBrowser.chromiumWebBrowser1.Reload(true); }
            }
        }

        private async Task ClearCache(object sender) {
            using (var devToolsClient = chromiumWebBrowser1.GetDevToolsClient()) {
                var response = await devToolsClient.Network.ClearBrowserCacheAsync();
            }
        }

        private void newProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            NTP = new NewTextureForm(this);
            NTP.Show();
        }

        private void loadProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            LOADFORM = new LoadForm(this);
            LOADFORM.Show();
        }

        private void unLoadProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            killSubProcess();
        }

        private void killAllNodeOnMyComputerToolStripMenuItem_Click(object sender, EventArgs e) {
            killNODEProcess();
        }

        public void killNODEProcess() {
            cmdKillerProc.txtBxStdin.Text = @"taskkill /im node.exe /T /F";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
        }

        /// <summary>
        /// Kill a process, and all of its children, grandchildren, etc.
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
                KillProcessAndChildren(cmdVJS3EDITOR._PID_);
                KillProcessAndChildren(cmdVJS3WATCH._PID_);
                KillProcessAndChildren(cmdLoader._PID_);
                /*
                cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdVJS3EDITOR._PID_ + @" /T /F";
                cmdKillerProc.btnSendStdinToProcess.PerformClick();
                cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdVJS3WATCH._PID_ + @" /T /F";
                cmdKillerProc.btnSendStdinToProcess.PerformClick();
                cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdLoader._PID_ + @" /T /F";
                cmdKillerProc.btnSendStdinToProcess.PerformClick();
               */

                if (cmdStream != null) {
                    cmdStream.Close();
                    cmdStream.Dispose();
                }

               //cmdLoader.runningProcess.Close();
               // cmdVJS3EDITOR.runningProcess.Close();
               // cmdVJS3WATCH.runningProcess.Close();

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
            FSBrowser.chromiumWebBrowser1.Focus();
            FSBrowser.chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
            chromiumWebBrowser1.Focus();
            chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
        }

        private void exitEditorModeToolStripMenuItem_Click(object sender, EventArgs e) {
            // chromiumWebBrowser1
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
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 512;
            chromiumWebBrowser1.Height = 512;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10*4);
            FSBrowser.Text = @"PowerOf2 [" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            FSBrowser.Size = new Size(512, 512);
            FSBrowser.chromiumWebBrowser1.Location = new Point(0, 0);
            button1.PerformClick();
        }

        private void x1024ToolStripMenuItem_Click(object sender, EventArgs e) {
            FSBrowser.Size = new Size(1024, 1024);
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 1024;
            chromiumWebBrowser1.Height = 1024;
            FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            FSBrowser.Text = @"PowerOf2 [" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            button1.PerformClick();
        }

        private void iPhone13Pro390X844ToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 390;
            chromiumWebBrowser1.Height = 844;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            // FSBrowser.chromiumWebBrowser1.Dock = DockStyle.None;
            FSBrowser.Size = new Size(390, 844);
            FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            FSBrowser.Text = @"Device: iPhone13Pro[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
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
                FSBrowser.Show();
            } catch (Exception err) {
                FSBrowser = new FS();
                FSBrowser.Show();
            }
        }

        private void hideToolStripMenuItem_Click(object sender, EventArgs e) {
            FSBrowser.Hide();
        }

        private void showToolStripMenuItem1_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Show();
        }

        private void hideToolStripMenuItem1_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Hide();
        }

        private void iPhoneXR414x896ToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 414;
            chromiumWebBrowser1.Height = 896;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            FSBrowser.Text = @"Device: iphoneXR[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            FSBrowser.Size = new Size(414, 896);
            FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            button1.PerformClick();
        }

        private void iphoneXS375x812ToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 375;
            chromiumWebBrowser1.Height = 812;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            FSBrowser.Text = @"Device: iphoneXS[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            FSBrowser.Size = new Size(375, 812);
            FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            button1.PerformClick();
        }

        private void iphoneX275x812ToolStripMenuItem_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Dock = DockStyle.None;
            chromiumWebBrowser1.Width = 275;
            chromiumWebBrowser1.Height = 812;
            chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, 50);
            FSBrowser.Text = @"Device: iphoneX[" + chromiumWebBrowser1.Width + "x" + chromiumWebBrowser1.Height + "]";
            FSBrowser.Size = new Size(375, 812);
            FSBrowser.chromiumWebBrowser1.Location = new Point(this.Size.Width / 3, this.Size.Height / 10 * 4);
            button1.PerformClick();
        }

        private void scriptEditorToolStripMenuItem_Click(object sender, EventArgs e) {
            if (scriptGUIEditor.IsDisposed == false) {
                scriptGUIEditor.Show();
            } else {
                scriptGUIEditor = new ScritpEditor(APP_DIR, APP_NAME);
                scriptGUIEditor.Show();
                scriptGUIEditor.Location = new Point(this.Size.Width / 100 * 65, 20);
                scriptGUIEditor.SCRIPT_SRC.Text = APP_DIR;
            }
        }
    }
}
