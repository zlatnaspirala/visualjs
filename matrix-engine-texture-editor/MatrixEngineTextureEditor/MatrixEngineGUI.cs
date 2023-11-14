using CefSharp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class MatrixEngineGUI : Form {
        CmdWindowControlTestApp.MainForm cmdStream;
        CmdWindowControlTestApp.MainForm cmdLoader;
        CmdWindowControlTestApp.MainForm cmdVJS3EDITOR;
        CmdWindowControlTestApp.MainForm cmdVJS3WATCH;
        CmdWindowControlTestApp.MainForm cmdKillerProc;
        ScritpEditor scriptGUIEditor;
        NewTextureForm NTP;
        LoadForm LOADFORM;
        public String APP_DIR;

        public void START(String ARG) {
            APP_DIR = ARG;
            cmdStream = new CmdWindowControlTestApp.MainForm();
            cmdStream.Load += cdmStreamWizardloaded;
            cmdStream.Show();
        }


        private void detectHost(object sender, EventArgs e) {
            string navUrl = cmdLoader.result.Text;
            URLTEXT.Text = navUrl;
            chromiumWebBrowser1.Load(URLTEXT.Text);
            runWatchAndEditor();
        }

        private void detectEditorRunStatus(object sender, EventArgs e) {
            // ?string navUrl = cmdVJS3EDITOR.result.Text;
            // URLTEXT.Text = navUrl;
            // chromiumWebBrowser1.Load(URLTEXT.Text);
            // runWatchAndEditor();

            //


        }

        public void runWatchAndEditor() {
            cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            cmdKillerProc.Load += cmdKillerLoader;
            cmdKillerProc.Show();
            // Hosting runs now 
            cmdVJS3EDITOR = new CmdWindowControlTestApp.MainForm();
            cmdVJS3EDITOR.Load += cmdEDITORLoader;

            cmdVJS3WATCH = new CmdWindowControlTestApp.MainForm();
            cmdVJS3WATCH.Load += cmdWATCHLoader;

            cmdVJS3EDITOR.Show();
            cmdVJS3WATCH.Show();

            scriptGUIEditor = new ScritpEditor(APP_DIR);
            scriptGUIEditor.Show();
        }

        public void LOAD(String ARG) {
            APP_DIR = ARG;
            cmdLoader = new CmdWindowControlTestApp.MainForm();
            cmdLoader.Load += cmdLoaderLoader;
            cmdLoader.Show();
            cmdLoader.result.TextChanged += detectHost;
        }

        public MatrixEngineGUI(string args) {
            InitializeComponent();
            string URLStart = "https://maximumroulette.com/apps/matrix-engine/examples-build.html";
            URLTEXT.Text = URLStart;
            
            if (args.ToString() != "") {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
            } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }
        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e) {

        }

        private void MatrixEngineGUI_Load(object sender, EventArgs e) {

        }

        private void cmdKillerLoader(object sender, EventArgs e) {
            
        }

        private void cmdWATCHLoader(object sender, EventArgs e) {

            // cmdVJS3WATCH.Size = new Size(this.Size.Width/2, this.Size.Height/5);
            cmdVJS3WATCH.Location = new Point(Location.X + Size.Width / 2, Location.Y + this.Size.Height / 4);

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
            cmdVJS3EDITOR.Location = new Point(Location.X + Size.Width / 2, Location.Y + 2 * this.Size.Height / 4);

            cmdVJS3EDITOR.txtBxStdin.Text = @"c:";
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();

            cmdVJS3EDITOR.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();

            cmdVJS3EDITOR.txtBxStdin.Text = @"npm run te";
            cmdVJS3EDITOR.btnSendStdinToProcess.PerformClick();
        }

        private void cmdLoaderLoader(object sender, EventArgs e) {
            // cmdLoader.Size = new Size(this.Size.Width, this.Size.Height / 3);
            cmdLoader.Location = new Point(Location.X + Size.Width / 2, Location.Y + 3 * this.Size.Height / 4);

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
            
            string APP_PACKAGE = APP_DIR + @"\\package.json";
            string PACKAGE_CONTENT = matrix_engine.Properties.Resources.package.ToString();
            File.WriteAllText(APP_PACKAGE, PACKAGE_CONTENT);

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

            cmdStream.txtBxStdin.Text = @"npm run host-for-gui";
            cmdStream.btnSendStdinToProcess.PerformClick();
            // string navUrl = APP_DIR + @"/matrix-engine/2DTextureEditor/tex1.html";
        }

        private void button1_Click(object sender, EventArgs e) {
            chromiumWebBrowser1.Load(URLTEXT.Text);
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
            cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdVJS3EDITOR._PID_ + @" /T ";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdVJS3WATCH._PID_ + @" /T ";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            cmdKillerProc.txtBxStdin.Text = @"taskkill /pid " + cmdLoader._PID_ + @" /T ";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();

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
        }

        private void killAllNodeOnMyComputerToolStripMenuItem_Click(object sender, EventArgs e) {
            killSubProcess();
        }

        public void killSubProcess() {
            cmdKillerProc.txtBxStdin.Text = @"taskkill /im node /T /F";
            cmdKillerProc.btnSendStdinToProcess.PerformClick();
            
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e) {
            killSubProcess();
            Application.Exit();

            cmdVJS3EDITOR.Show();
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
            chromiumWebBrowser1.Focus();
            chromiumWebBrowser1.GetBrowser().GetHost().SendKeyEvent(k);
        }

        private void exitEditorModeToolStripMenuItem_Click(object sender, EventArgs e) {
            //chromiumWebBrowser1
        }
    }
}
