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
    public partial class ScritpEditor : Form {
        MatrixEngineGUI MAINFORM;
        public string PATH = "";
        public CmdWindowControlTestApp.MainForm cmdVJS3WATCH;
        public ScritpEditor(String P, String APP_NAME, MatrixEngineGUI MAINFORM_) {
            InitializeComponent();
            // APP_DIR - p APP_NAME
            PATH = P + "\\2DTextureEditor\\gui-texture-editor.js";
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

    }
}
