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
        public ScritpEditor3d(String P, String APP_NAME, MatrixEngineGUI MAINFORM_) {
            InitializeComponent();
            // APP_DIR - p APP_NAME
            PATH = P + "\\.js";
            // ERROR PATH
            StreamReader sr = new StreamReader(PATH);
            CODE_EDITOR.Text = sr.ReadToEnd().ToString();
            sr.Close();
            MAINFORM = MAINFORM_;
        }

        private void ScritpEditor_Load(object sender, EventArgs e) {
            // empty
            toolTip1.SetToolTip(this.SCRIPT_SRC, "Click to open in file explorer.");
        }

        private void saveBtn_Click(object sender, EventArgs e) {
            try {
                string TEXTURE_JS_FILE = PATH;
                string PACKAGE_CONTENT = CODE_EDITOR.Text;
                File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
                Thread.Sleep(50);
                MAINFORM.button1.PerformClick();
            } catch (Exception err) {}
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
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("runEditor();", "// READONLY_LINE runEditor();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("loadEditor();", "// READONLY_LINE loadEditor();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("loadEditorObjects();", "// READONLY_LINE loadEditorObjects();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("// READONLY_LINE APPLICATION.EDITOR = false;", " APPLICATION.EDITOR = false;");
        }

        private void backToCodingBtn_Click(object sender, EventArgs e) {
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("// READONLY_LINE runEditor();", "runEditor();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("// READONLY_LINE loadEditor();", "loadEditor();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("// READONLY_LINE loadEditorObjects();", "loadEditorObjects();");
            CODE_EDITOR.Text = CODE_EDITOR.Text.Replace("APPLICATION.EDITOR = false;", "// READONLY_LINE APPLICATION.EDITOR = false;");
        }
    }
}
