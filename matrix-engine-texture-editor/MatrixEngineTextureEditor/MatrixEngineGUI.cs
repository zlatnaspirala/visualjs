using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class MatrixEngineGUI : Form {
        CmdWindowControlTestApp.MainForm cmdStream;
        NewTextureForm NTP;
        LoadForm LOADFORM;
        public String APP_DIR;

        public void START(String ARG) {

            APP_DIR = ARG;
            cmdStream = new CmdWindowControlTestApp.MainForm();
            cmdStream.Load += cdmStreamWizardloaded;
            cmdStream.Show();

            }
        public MatrixEngineGUI(string args) {
            InitializeComponent();
            string URLStart = "https://maximumroulette.com/apps/nidza";

            if (args.ToString() != "") {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
                } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }
        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e) {

            }

        private void MatrixEngineGUI_Load(object sender, EventArgs e) {

            }
 

        private void cdmStreamWizardloaded(object sender, EventArgs e) {
            cmdStream.Size = new Size(this.Size.Width, this.Size.Height / 3);
            // cmdStream.Size = new Size(this.Size.Width, this.Size.Height );
            cmdStream.Location = new Point(Location.X, Location.Y);
            Thread.Sleep(10);
            string APP_PACKAGE = APP_DIR + @"\\package.json";
            string PACKAGE_CONTENT = matrix_engine.Properties.Resources.package.ToString();
            File.WriteAllText(APP_PACKAGE, PACKAGE_CONTENT);

            string FILE_QUERYHTML = APP_DIR + @"\\query.html";
            string PACKAGE_CONTENT1 = matrix_engine.Properties.Resources.query.ToString();
            File.WriteAllText(FILE_QUERYHTML, PACKAGE_CONTENT1);

            // string NIK = APP_DIR.Replace(@" ", "%20");
            cmdStream.txtBxStdin.Text = @"c:";
            cmdStream.btnSendStdinToProcess.PerformClick();
            Thread.Sleep(10);

            cmdStream.txtBxStdin.Text = @"cd " + APP_DIR;
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"git clone https://github.com/zlatnaspirala/matrix-engine.git";
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"cd matrix-engine";
            cmdStream.btnSendStdinToProcess.PerformClick();

            cmdStream.txtBxStdin.Text = @"npm i";
            cmdStream.btnSendStdinToProcess.PerformClick();
            string navUrl = APP_DIR + @"/matrix-engine/2DTextureEditor/tex1.html";

            URLTEXT.Text = navUrl;
            // chromiumWebBrowser1.Load(navUrl);


            }

        private void button1_Click(object sender, EventArgs e) {


            chromiumWebBrowser1.Load(URLTEXT.Text);

            }

 

        private void newProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            NTP = new NewTextureForm(this);
            NTP.Show();

            }

        private void loadProjectToolStripMenuItem_Click(object sender, EventArgs e) {
            LOADFORM = new LoadForm(this);
            LOADFORM.Show();
            }
        }
    }
