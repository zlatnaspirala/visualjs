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
    public partial class PackageForm : Form {
        MatrixEngineGUI MAINFORM;
        public string APP_DIR_TEST;
        public string APP_DIR_TEST_EXPORTS;
        public string LAST_NATIVE_BUILD_CONFIG_PATH = "";
        private string TEXT_NOLIB = "No dep library exist, please install deps.";
        CmdWindowControlTestApp.MainForm HOST_LOCALHOST;
        CmdWindowControlTestApp.Android ANDROID_CMD;

        public PackageForm(MatrixEngineGUI MAIN) {
            InitializeComponent();
            MAINFORM = MAIN;
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            // Environment.SpecialFolder.Desktop
            APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS);
            }
            // APP_DIR_TEST_EXPORTS
            webAppExportPath.Text = APP_DIR_TEST_EXPORTS;
        }

        private void BuildForHybrid_Click(object sender, EventArgs e) {
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            if (MAINFORM.cmdKillerProc == null || MAINFORM.cmdKillerProc.IsDisposed == true) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                MAINFORM.cmdKillerProc.Load += MAINFORM.cmdKillerLoader;

                MAINFORM.cmdKillerProc.TransparencyKey = Color.Turquoise;
                MAINFORM.cmdKillerProc.BackColor = Color.Turquoise;
                // MessageBox.Show("No project started. ", "Matrix-engine error msg.", MessageBoxButtons.OK);
            }

            // var APP_NATIVEPATH = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\";
            // var APP_NATIVEPATHFILE = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\matrix-engine.exe";

            MAINFORM.cmdKillerProc.nativeExeBuild.TextChanged += MAINFORM.NATIVE_EXE_DONE;

            if (MAINFORM.cmdKillerProc == null) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            }
            MAINFORM.cmdKillerProc.Show();
            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"c:";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR_TEST;
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"npm run build.gui.app";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"desktop-build.bat";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();
            MAINFORM.cmdKillerProc.BIGTEXT.Text = "Building native desktop matrix-engine.exe";
        }

        private void buildcanvas2dBtn_Click(object sender, EventArgs e) {
            if (MAINFORM.cmdKillerProc == null) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            }
            // build res for any case last time before final build!
            MAINFORM.cmdKillerProc.BIGTEXT.Text = "Build res for any case last time before final build!";
            MAINFORM.stopEditorToolStripMenuItem.PerformClick();
            MAINFORM.buildRes();
            Thread.Sleep(1000);
            MAINFORM.cmdKillerProc.BIGTEXT.Text = "Build final visual.js file and prepare HTML page!";
            MAINFORM.cmdKillerProc.buildFinalVJS3.TextChanged += MAINFORM.BUILD_VJS3_FINAL;
            MAINFORM.cmdKillerProc.exported2d.TextChanged += MAINFORM.WEB2DEXPORT_READY;
            MAINFORM.buildFinalVisualJS();
        }

        private void PackageForm_Load(object sender, EventArgs e) {

        }

        private void button1_Click(object sender, EventArgs e) {
            Process.Start(webAppExportPath.Text.ToString());
        }

        private void button1_Click_1(object sender, EventArgs e) {
            if (NATIVEBuildPATH.Text == "") return;
            var T = NATIVEBuildPATH.Text + @"\me.txt";
            Process.Start(T);
        }

        // test not in function
        public static void OpenWithDefaultProgram(string path) {
            Process fileopener = new Process();
            fileopener.StartInfo.FileName = "explorer";
            fileopener.StartInfo.Arguments = "\"" + path + "\"";
            fileopener.Start();
        }

        private void runLastNATIVEBuildBtn_Click(object sender, EventArgs e) {
            if (NATIVEBuildPATH.Text == "" || MAINFORM.cmdKillerProc == null) {
                MessageBox.Show("No actual build.");
                return;
            }
            // RUNNING
            MAINFORM.cmdKillerProc.Show();
            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"c:";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();
            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"cd " + NATIVEBuildPATH.Text;
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();
            // This is PUBLIC FOLDER 
            var APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            APP_DIR = APP_DIR + @"\public";
            // MessageBox.Show(APP_DIR);
            if (isSelfHost.Checked) {
                APP_DIR = "http://localhost";
                MAINFORM.cmdKillerProc.txtBxStdin.Text = "matrix-engine.exe url=http://localhost/public/gui.html";
            } else {
                MAINFORM.cmdKillerProc.txtBxStdin.Text = "matrix-engine.exe url=\"" + APP_DIR + "\"";
            }
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();
            MAINFORM.cmdKillerProc.BIGTEXT.Text = "Running native desktop matrix-engine.exe ...";
        }

        private void isSelfHost_CheckedChanged(object sender, EventArgs e) {
            var APP_DIRINFLY = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine";
            if (isSelfHost.Checked) {
                HOST_LOCALHOST = new CmdWindowControlTestApp.MainForm();
                // this is http server only for package LOCALHOST STATUS
                // Final web app path is your job. You need to have public web server for hosting!
                // ME and ME GUI will create final html/js/css [ecma6]
                HOST_LOCALHOST.preventSignalForHost = true;
                HOST_LOCALHOST.Show();
                HOST_LOCALHOST.txtBxStdin.Text = @"c:";
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
                HOST_LOCALHOST.txtBxStdin.Text = @"cd " + APP_DIRINFLY;
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
                HOST_LOCALHOST.txtBxStdin.Text = @"http-server ./ -p " + HOSTPORT.Text; // + " -d true";
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
            } else {
                // checkedthecheckbox = false;
                KillProcessAndChildren(HOST_LOCALHOST._PID_);
                // test
                HOST_LOCALHOST.Close();
                HOST_LOCALHOST.Dispose();
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
        private void openfolderNative_Click(object sender, EventArgs e) {
            try {
                Process.Start(NATIVEBuildPATH.Text.ToString());
            } catch (Exception err) { }
        }

        private void runInChrome_Click(object sender, EventArgs e) {
            var t = "\"" + webAppExportPath.Text.ToString() + "\\GUI.html" + "\"";
            Process.Start("chrome.exe", t);
            // Process.Start("chrome.exe", "http://www.YourUrl.com");
        }

        private void runInFF_Click(object sender, EventArgs e) {
            var t = "\"" + webAppExportPath.Text.ToString() + "\\GUI.html" + "\"";
            Process.Start("firefox.exe", t);
        }

        private void runInOpera_Click(object sender, EventArgs e) {
            var t = "\"" + webAppExportPath.Text.ToString() + "\\GUI.html" + "\"";
            Process.Start("opera.exe", t);
        }

        private void button2_Click(object sender, EventArgs e) {
            var t = "\"" + webAppExportPath.Text.ToString() + "\\GUI.html" + "\"";
            Process.Start("msedge.exe", t);
        }

        private void buildForAndroid_Click(object sender, EventArgs e) {
            var APP_DIRINFLY = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine";

            // "cd ~/Android/Sdk/tools/bin && ./avdmanager list avd"
            ANDROID_CMD = new CmdWindowControlTestApp.Android();
            ANDROID_CMD.Show();
            // ANDROID_CMD.txtBxStdin.Text = @"c:";
            // ANDROID_CMD.btnSendStdinToProcess.PerformClick();
            ANDROID_CMD.txtBxStdin.Text = ANDROIDSDKPATH.Text.ToString()[0] + ":";
            ANDROID_CMD.btnSendStdinToProcess.PerformClick();

            ANDROID_CMD.txtBxStdin.Text = @"cd " + ANDROIDSDKPATH.Text.ToString();
            ANDROID_CMD.btnSendStdinToProcess.PerformClick();
            // List devices:
            // ANDROID_CMD.txtBxStdin.Text = @"cd tools/bin && avdmanager.bat list avd";
            // ANDROID_CMD.txtBxStdin.Text = @"cd tools && emulator.exe -avd pixel_7_pro";
            ANDROID_CMD.txtBxStdin.Text = @"cd tools && emulator.exe -list-avds";
            // 7.6_Fold-in_with_outer_display_API_30
            ANDROID_CMD.btnSendStdinToProcess.PerformClick();
        }

        private void ANDROIDSDKPATH_TextChanged(object sender, EventArgs e) {

        }

        private void setAndroidSDKBtn_Click(object sender, EventArgs e) {

        }
    }
}
