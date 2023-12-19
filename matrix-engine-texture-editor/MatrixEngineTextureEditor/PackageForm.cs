using Microsoft.Win32;
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
        CmdWindowControlTestApp.Android ANDROID_CMD_ADB;

        // Local Storage
        private RegistryKey key;

        public PackageForm(MatrixEngineGUI MAIN) {
            InitializeComponent();
            MAINFORM = MAIN;
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS);
            }
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
            }
            MAINFORM.cmdKillerProc.preventHYBRYD_IF_WEBGL = false;
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
            // GUI CACHE MEMORY
            if (Registry.CurrentUser.OpenSubKey(@"SOFTWARE\ZLATNASPIRALA_MATRIX_ENGINE") == null) {
                key = Registry.CurrentUser.CreateSubKey(@"SOFTWARE\ZLATNASPIRALA_MATRIX_ENGINE");
                key.SetValue("androidSDKPath", "yes");
                key.SetValue("androidAVDPath", "yes");
                key.Close();
            } else {
                key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\ZLATNASPIRALA_MATRIX_ENGINE", true);
                ANDROIDSDKPATH.Text = (string)key.GetValue("androidSDKPath");
                ANDROID_AVD_HOME.Text = (string)key.GetValue("androidAVDPath");
                key.Close();
            }

            // Automatic search for AVD path
            var ANDROID_AVD_FILES_PATH = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + @"\.android\avd";
            if (Directory.Exists(ANDROID_AVD_FILES_PATH)) {
                var ANDROID_CMD_LOCAL = new CmdWindowControlTestApp.Android();
                ANDROID_CMD_LOCAL.Show();
                ANDROID_CMD_LOCAL.txtBxStdin.Text = "SET ANDROID_AVD_HOME=\"" + ANDROID_AVD_FILES_PATH.ToString() + "\"";
                ANDROID_CMD_LOCAL.btnSendStdinToProcess.PerformClick();
                ANDROID_CMD_LOCAL.Hide();
                Thread.Sleep(2000);
                ANDROID_CMD_LOCAL.Close();
                ANDROID_AVD_HOME.Text = ANDROID_AVD_FILES_PATH.ToString();
                avdDesc.Text = "AVD path detected.";
            }
            // Search also for $ANDROID_SDK_HOME/.android/avd/
            string getEnvANdroidSDKPath = Environment.GetEnvironmentVariable("ANDROID_SDK_HOME");
            string getEnvANdroidAVDPath = Environment.GetEnvironmentVariable("ANDROID_AVD_HOME");
            if (getEnvANdroidSDKPath == null) {
                MessageBox.Show("ANDROID_SDK_HOME ENV VAR NOT DEFINED!");
            }
            var ANDROID_AVD_FILES_PATH_2 = getEnvANdroidSDKPath + @"\.android\avd";
            if (Directory.Exists(ANDROID_AVD_FILES_PATH_2)) {
                var ANDROID_CMD_LOCAL = new CmdWindowControlTestApp.Android();
                ANDROID_CMD_LOCAL.Show();
                ANDROID_CMD_LOCAL.txtBxStdin.Text = "SET ANDROID_AVD_HOME=\"" + ANDROID_AVD_FILES_PATH_2.ToString() + "\"";
                ANDROID_CMD_LOCAL.btnSendStdinToProcess.PerformClick();
                ANDROID_CMD_LOCAL.Hide();
                Thread.Sleep(2000);
                ANDROID_CMD_LOCAL.Close();
                ANDROID_AVD_HOME.Text = ANDROID_AVD_FILES_PATH_2.ToString();
                avdDesc.Text = "AVD path detected.";
            }
        }

        private void button1_Click(object sender, EventArgs e) {
            Process.Start(webAppExportPath.Text.ToString());
        }

        private void button1_Click_1(object sender, EventArgs e) {
            if (NATIVEBuildPATH.Text == "") return;
            var T = NATIVEBuildPATH.Text + @"\me.txt";
            if (File.Exists(T)) {
                Process.Start(T);
            } else {
                // Create me.txt if not exist
                var PACKAGE_CONTENT = "{ \"APP_STATUS\": \"APP_LOCALHOST\", \"APP_PRODUCTION\": \"https://maximumroulette.com\", \"APP_DEV\": \"https://localhost/dev\", \"APP_LOCALHOST\": \"http://localhost/\" }";
                File.WriteAllText(T, PACKAGE_CONTENT.ToString());
            }           
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
            if (Directory.Exists(ANDROIDSDKPATH.Text.ToString()) != true || ANDROIDSDKPATH.Text.ToString() == "") {
                MessageBox.Show("Please set ANDROID SDK Path !");
                return;
            }

            var APP_DIRINFLY = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine";
            // "cd ~/Android/Sdk/tools/bin && ./avdmanager list avd"
            ANDROID_CMD = new CmdWindowControlTestApp.Android();
            ANDROID_CMD.Show();

            ANDROID_CMD.txtBxCmd.Text = "emulator.exe";
            ANDROID_CMD.txtBxDirectory.Text = ANDROIDSDKPATH.Text.ToString() + "/emulator";
            ANDROID_CMD.txtBxArgs.Text = "-list-avds";
            ANDROID_CMD.btnRunCommand.PerformClick();

            //  HARDCODE for now Pixel_7_Pro_API_30
            ANDROID_CMD.txtBxArgs.Text = "-avd " + "Pixel_7_Pro_API_30";
            ANDROID_CMD.btnRunCommand.PerformClick();

            // Thread.Sleep(5000);
            // I DONT KNOW HOW ADB KNOWS PATH OF MY PROJECT - IT IS A PROBLEM IF 
            // ANDROID STUDIO SAVE DEFAULT OR LAST OPENED PROJECT - works for now
            ANDROID_CMD_ADB = new CmdWindowControlTestApp.Android();
            ANDROID_CMD_ADB.Show();
            ANDROID_CMD_ADB.txtBxCmd.Text = "adb.exe";
            ANDROID_CMD_ADB.txtBxDirectory.Text = ANDROIDSDKPATH.Text.ToString() + "/platform-tools";
            // adb shell am start -n com.nikolalukic.matrixengineandroid/com.nikolalukic.matrixengineandroid.MainActivity
            ANDROID_CMD_ADB.txtBxArgs.Text = "shell am start -n com.nikolalukic.matrixengineandroid/com.nikolalukic.matrixengineandroid.MainActivity";
            ANDROID_CMD_ADB.btnRunCommand.PerformClick();

            // ANDROID_CMD.txtBxArgs.Text = "-avd ";
            // ANDROID_CMD.btnRunCommand.PerformClick();            
            // H:\system-support\android-sdk\platform-tools
            // ANDROID_CMD.txtBxCmd.Text = "adb.exe";
            // ANDROID_CMD.txtBxDirectory.Text = ANDROIDSDKPATH.Text.ToString() + "/platform-tools";
            // ANDROID_CMD.txtBxArgs.Text = "devices";
            // ANDROID_CMD.btnRunCommand.PerformClick();
            // ANDROID_CMD.txtBxStdin.Text = @"c:";
            // ANDROID_CMD.txtBxStdin.Text = ANDROIDSDKPATH.Text.ToString()[0] + ":";
            // ANDROID_CMD.btnSendStdinToProcess.PerformClick();
            //  ANDROID_CMD.txtBxStdin.Text = @"cd " + ANDROIDSDKPATH.Text.ToString();
            //  ANDROID_CMD.btnSendStdinToProcess.PerformClick();

            // >>>>  $ANDROID_SDK_HOME/.android/avd/
            // C:\Users\Nikola Lukic\.android\avd
            /*
            var ANDROID_AVD_FILES_PATH = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + @"\.android\avd";
            if (Directory.Exists(ANDROID_AVD_FILES_PATH)) {
                // ANDROID_CMD.txtBxStdin.Text = @"cd " + ANDROID_AVD_FILES_PATH;
                ANDROID_CMD.txtBxStdin.Text = "SET ANDROID_AVD_HOME=\"" + ANDROID_AVD_FILES_PATH.ToString() + "\"";
                ANDROID_CMD.btnSendStdinToProcess.PerformClick();
            }
            */

            //            var EMULPATH = ANDROIDSDKPATH.Text.ToString() + "/emulator/";

            // var processStartInfo = new ProcessStartInfo();
            // processStartInfo.WorkingDirectory = ANDROIDSDKPATH.Text.ToString() + "/emulator";
            // processStartInfo.FileName = "cmd.exe";
            // processStartInfo.Arguments = "emulator.exe -avd 7.6_Fold-in_with_outer_display_API_30";

            // set additional properties     
            //Process proc = Process.Start(processStartInfo);

            // List devices:
            // ANDROID_CMD.txtBxStdin.Text = @"cd tools/bin && avdmanager.bat list device";
            // ANDROID_CMD.btnSendStdinToProcess.PerformClick();

            //ANDROID_CMD.txtBxStdin.Text = @"cd emulator";
            //ANDROID_CMD.btnSendStdinToProcess.PerformClick();
            //ANDROID_CMD.txtBxStdin.Text = @"emulator.exe -list-avds";
            //ANDROID_CMD.btnSendStdinToProcess.PerformClick();

            //ANDROID_CMD.txtBxStdin.Text = @"emulator.exe -avd 7.6_Fold-in_with_outer_display_API_30";
            //ANDROID_CMD.btnSendStdinToProcess.PerformClick();

            // -list-avds
            // ANDROID_CMD.txtBxStdin.Text = @"cd tools && emulator.exe -list-avds";
            // 7.6_Fold-in_with_outer_display_API_30
            // 7.6_Fold-in_with_outer_display_API_30

        }

        private void ANDROIDSDKPATH_TextChanged(object sender, EventArgs e) {
            // 
        }

        private void setAndroidSDKBtn_Click(object sender, EventArgs e) {
            key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\ZLATNASPIRALA_MATRIX_ENGINE", true);
            key.SetValue("androidSDKPath", ANDROIDSDKPATH.Text);
            key.Close();
        }

        private void setAVDPath_Click(object sender, EventArgs e) {
            key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\ZLATNASPIRALA_MATRIX_ENGINE", true);
            key.SetValue("androidSDKPath", ANDROID_AVD_HOME.Text);
            key.Close();
        }

        private void exportWebGL_Click(object sender, EventArgs e) {
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show(TEXT_NOLIB, "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            if (MAINFORM.cmdKillerProc == null || MAINFORM.cmdKillerProc.IsDisposed == true) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                MAINFORM.cmdKillerProc.Load += MAINFORM.cmdKillerLoader;
                // MAINFORM.cmdKillerProc.TransparencyKey = Color.Turquoise;
                // MAINFORM.cmdKillerProc.BackColor = Color.Turquoise;
            }
            MAINFORM.cmdKillerProc.preventHYBRYD_IF_WEBGL = true;
            MAINFORM.cmdKillerProc.exportedwebgl.TextChanged += MAINFORM.webGLFinishBuild;
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

        private void label12_Click(object sender, EventArgs e) {

        }
    }
}
