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

        public ScritpEditor(String P, String APP_NAME) {
            InitializeComponent();
            // APP_DIR - p APP_NAME


            StreamReader sr = new StreamReader(P + "\\2DTextureEditor\\tex1.js");
            CODE_EDITOR.Text = sr.ReadToEnd().ToString();
            sr.Close();
        }

        private void ScritpEditor_Load(object sender, EventArgs e) {

        }
    }
}
