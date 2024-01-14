using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class ScritpEditor3d : Form {
        MatrixEngineGUI MAINFORM;
        public string PATH = "";
        public CmdWindowControlTestApp.Android cmdVJS3WATCH;
        Boolean PREVENT_SAVE = false;

        public ScritpEditor3d(String P, String APP_NAME, MatrixEngineGUI MAINFORM_) {
            InitializeComponent();
            PATH = P + "\\gui\\app.js";
            StreamReader sr = new StreamReader(PATH);
            CODE_EDITOR.Text = sr.ReadToEnd().ToString();
            sr.Close();
            MAINFORM = MAINFORM_;
        }

        private void ScritpEditor_Load(object sender, EventArgs e) {
            toolTip1.SetToolTip(this.SCRIPT_SRC, "Click to open in file explorer.");
        }

        public void test(object sender, EventArgs e) {
            // MessageBox.Show("Matrix-engine project js pack builded.", "Status good");
            PREVENT_SAVE = false;
            MAINFORM.button2.PerformClick();
        }
        private void saveBtn_Click(object sender, EventArgs e) {
            if (PREVENT_SAVE == false) {
                PREVENT_SAVE = true;
                try {
                    string TEXTURE_JS_FILE = PATH;
                    string PACKAGE_CONTENT = CODE_EDITOR.Text;
                    File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
                    Thread.Sleep(100);
                    if (MAINFORM.cmdWebglRun != null && MAINFORM.cmdWebglRun.IsDisposed == false) {
                        MAINFORM.cmdWebglRun.buildgui.Text = "";
                        MAINFORM.cmdWebglRun.buildgui.TextChanged += test;
                        MAINFORM.cmdWebglRun.btnSendStdinToProcess.PerformClick();
                    }
                } catch (Exception err) {
                    MessageBox.Show("Matrix-Engine GUI: " + err.ToString(), "ERROR IN SAVE PROCEDURE, TRY AGAIN!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    PREVENT_SAVE = false;
                }
            }
        }

        private void button1_Click(object sender, EventArgs e) {
            this.Hide();
        }

        private void SCRIPT_SRC_Click(object sender, EventArgs e) {
            SCRIPT_SRC.Text = SCRIPT_SRC.Text.Replace("gui-texture-editor.js", "");
            if (Directory.Exists(SCRIPT_SRC.Text)) {
                ProcessStartInfo startInfo = new ProcessStartInfo {
                Arguments = SCRIPT_SRC.Text,
                FileName = "explorer.exe"
            };
            Process.Start(startInfo);
            } else {
                MessageBox.Show(string.Format("{0} Directory does not exist!", SCRIPT_SRC.Text));
            }
        }

        private void prepareForPackBtn_Click(object sender, EventArgs e) {
            // CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("runEditor();", "// READONLY_LINE runEditor();");
        }
    }
}