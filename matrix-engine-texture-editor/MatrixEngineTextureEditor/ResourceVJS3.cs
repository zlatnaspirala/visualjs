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
    public partial class ResourceVJS3 : Form {

        string RES_PATH = "";
        MatrixEngineGUI MAINFORM;
        public ResourceVJS3(String P, MatrixEngineGUI MAINFORM_) {
            InitializeComponent();
            // test
            // ------------------------------
            RES_PATH = P + @"2DTextureEditor\res\animations\";
            labelPath.Text = RES_PATH;
            MAINFORM = MAINFORM_;
        }

        private void ResourceVJS3_Load(object sender, EventArgs e) {
            FILEPREVIEW.Navigate(RES_PATH);
        }

        private void BACK_Click(object sender, EventArgs e) {
            if (FILEPREVIEW.CanGoBack == true) {
                FILEPREVIEW.GoBack();
            }
        }

        private void ADDNEWIMAGE_Click(object sender, EventArgs e) {
            if (openFileDialog1.ShowDialog() == DialogResult.OK) {
                var fileName = this.openFileDialog1.FileName;
                var onlyNameExt = System.IO.Path.GetFileName(fileName);
                var onlyName = System.IO.Path.GetFileNameWithoutExtension(fileName);
                if (Directory.Exists(labelPath.Text + @"\" + onlyName) == false) {
                    Directory.CreateDirectory(labelPath.Text + @"\" + onlyName);
                    File.Copy(fileName, labelPath.Text + @"\" + onlyName + @"\" + onlyNameExt);
                    MAINFORM.buildRes();
                }
            }
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e) {

            // if (openFileDialog1.ShowDialog() == System.Windows.Forms.DialogResult.OK) {
                
            // }
        }
    }
}
