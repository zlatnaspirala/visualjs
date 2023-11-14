using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class NewTextureForm : Form {

        MatrixEngineGUI MAINFORM;
        String APP_DIR;

        public NewTextureForm(MatrixEngineGUI MF_) {
            InitializeComponent();
            MAINFORM = MF_;
        }

        private void w_Click(object sender, EventArgs e) {
            APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\matrix-texture-tool\\" + textureProjectName.Text;
            System.IO.Directory.CreateDirectory(APP_DIR);
                                    
            textureProjectName.Text = APP_DIR;
            MAINFORM.Text = APP_DIR;
            MAINFORM.START(APP_DIR);
            MAINFORM.APP_NAME = textureProjectName.Text;

            progressBar1.Value = 50;
        }
    }
}
