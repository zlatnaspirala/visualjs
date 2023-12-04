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
    public partial class PackageForm : Form {
        MatrixEngineGUI MAINFORM;
        public PackageForm(MatrixEngineGUI MAIN) {
            InitializeComponent();
            MAINFORM = MAIN;
        }

        private void BuildForHybrid_Click(object sender, EventArgs e) {

            var APP_DIR_TEST = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\matrix-texture-tool\matrixengine\matrix-engine\";
            if (Directory.Exists(APP_DIR_TEST) == false) {
                MessageBox.Show("No dep library exist, please install deps.", "Matrix-engine error msg.", MessageBoxButtons.OK);
                // NODE_DEP_INSTALLER = true;
                // newProjectToolStripMenuItem.Enabled = false;
            }

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
        }
    }
}
