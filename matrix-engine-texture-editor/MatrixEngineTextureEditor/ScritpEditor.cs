using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class ScritpEditor : Form {
        public string PATH = ""; 
        public ScritpEditor(String P, String APP_NAME) {
            InitializeComponent();
            // APP_DIR - p APP_NAME
            PATH = P + "\\2DTextureEditor\\gui-texture-editor.js";
            StreamReader sr = new StreamReader(PATH);
            CODE_EDITOR.Text = sr.ReadToEnd().ToString();
            sr.Close();
        }

        private void ScritpEditor_Load(object sender, EventArgs e) {
            // empty
        }

        private void saveBtn_Click(object sender, EventArgs e) {
            string TEXTURE_JS_FILE = PATH;
            string PACKAGE_CONTENT = CODE_EDITOR.Text;
            File.WriteAllText(TEXTURE_JS_FILE, PACKAGE_CONTENT);
        }

        private void button1_Click(object sender, EventArgs e) {
            this.Hide();
        }
    }
}
