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
    public partial class EditorConfig : Form {

        String PATH = "";
        public EditorConfig(String P) {
            InitializeComponent();

            PATH = P + "\\2DTextureEditor\\editor.js";

            StreamReader sr = new StreamReader(PATH);
            CODE_EDITOR.Text = sr.ReadToEnd().ToString();
            sr.Close();

        }

        private void EditorConfig_Load(object sender, EventArgs e) {
            
        }
    }
}
