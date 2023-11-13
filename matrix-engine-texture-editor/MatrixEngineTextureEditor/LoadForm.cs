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


    public partial class LoadForm : Form {

        MatrixEngineGUI MAINFORM;
        public LoadForm(MatrixEngineGUI MF_) {
            InitializeComponent();
            MAINFORM = MF_;
            }

        private void w_Click(object sender, EventArgs e) {

            var APP_DIR = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\" + textureProjectName.Text + @"\matrix-engine\";
            // var APP_DIR = @"localhost:8080";
            MAINFORM.URLTEXT.Text = @"http://127.0.0.1:8080";
            MAINFORM.button1.PerformClick();

            MAINFORM.LOAD(APP_DIR);

         }
        }
    }
