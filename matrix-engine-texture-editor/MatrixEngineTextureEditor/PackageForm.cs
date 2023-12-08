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
        CmdWindowControlTestApp.MainForm HOST_LOCALHOST; 

        public PackageForm(MatrixEngineGUI MAIN) {
            InitializeComponent();
            MAINFORM = MAIN;
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show("No dep library exist, please install deps.", "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            // Environment.SpecialFolder.Desktop
            APP_DIR_TEST_EXPORTS = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\exports\";
            if (Directory.Exists(APP_DIR_TEST_EXPORTS) == false) {
                MessageBox.Show("No dep library exist, please install deps.", "Matrix-engine error msg.", MessageBoxButtons.OK);
                Directory.CreateDirectory(APP_DIR_TEST_EXPORTS);
            }
            // APP_DIR_TEST_EXPORTS
            webAppExportPath.Text = APP_DIR_TEST_EXPORTS;
        }

        private void BuildForHybrid_Click(object sender, EventArgs e) {
            APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show("No dep library exist, please install deps.", "Matrix-engine error msg.", MessageBoxButtons.OK);
                return;
            }

            if (MAINFORM.cmdKillerProc == null) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
                MAINFORM.cmdKillerProc.Load += MAINFORM.cmdKillerLoader;
                // MessageBox.Show("No project started. ", "Matrix-engine error msg.", MessageBoxButtons.OK);
                // return;
            }

            var APP_NATIVEPATH = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\";
            var APP_NATIVEPATHFILE = APP_DIR_TEST + @"\multiplatform\win\cef-sharp\bin\Release\matrix-engine.exe";

            MAINFORM.cmdKillerProc.nativeExeBuild.TextChanged += MAINFORM.NATIVE_EXE_DONE;

            if (MAINFORM.cmdKillerProc == null) {
                MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            }
            MAINFORM.cmdKillerProc.Show();
            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"c:";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"cd " + APP_DIR_TEST; // + @"\2DTextureEditor";
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
            MAINFORM.buildFinalVisualJS();
        }

        private void PackageForm_Load(object sender, EventArgs e) {

        }

        private void button1_Click(object sender, EventArgs e) {
            Process.Start(APP_DIR_TEST_EXPORTS);
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
            if (NATIVEBuildPATH.Text == "") return;
            // RUNNING
            // MAINFORM.cmdKillerProc.Close();
            // MAINFORM.cmdKillerProc.Dispose();
            // MAINFORM.cmdKillerProc = new CmdWindowControlTestApp.MainForm();
            MAINFORM.cmdKillerProc.Show();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"c:";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            MAINFORM.cmdKillerProc.txtBxStdin.Text = @"cd " + NATIVEBuildPATH.Text;
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();

            // This is PUBLIC FOLDER 
            // C:\Users\Nikola Lukic\AppData\Roaming\matrix-texture-tool\matrixengine\matrix-engine\public
            var APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            APP_DIR = APP_DIR + @"\public";
            // MessageBox.Show(APP_DIR);

            if (isSelfHost.Checked) {
                APP_DIR = "http://localhost";
                MAINFORM.cmdKillerProc.txtBxStdin.Text = "matrix-engine.exe url=http://localhost"; //  + APP_DIR;
            } else {
                MAINFORM.cmdKillerProc.txtBxStdin.Text = "matrix-engine.exe url=\"" + APP_DIR + "\"";
            }

            // MAINFORM.cmdKillerProc.txtBxStdin.Text = "matrix-engine.exe url=\"" + APP_DIR + "\"";
            MAINFORM.cmdKillerProc.btnSendStdinToProcess.PerformClick();
            MAINFORM.cmdKillerProc.BIGTEXT.Text = "Running native desktop matrix-engine.exe ...";
        }

        private void isSelfHost_CheckedChanged(object sender, EventArgs e) {
            var APP_DIRINFLY = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (isSelfHost.Checked) {
                HOST_LOCALHOST = new CmdWindowControlTestApp.MainForm();
                HOST_LOCALHOST.Show();
                HOST_LOCALHOST.txtBxStdin.Text = @"c:";
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
                HOST_LOCALHOST.txtBxStdin.Text = @"cd " + APP_DIRINFLY;
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
                HOST_LOCALHOST.txtBxStdin.Text = @"http-server -p " + HOSTPORT.Text;
                HOST_LOCALHOST.btnSendStdinToProcess.PerformClick();
            } else {
                // checkedthecheckbox = false;
                KillProcessAndChildren(HOST_LOCALHOST._PID_);
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

    }
}
