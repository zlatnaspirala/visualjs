using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Visual_JS
{
    public partial class ImageResourceForm : Form
    {
        public ImageResourceForm()
        {
            InitializeComponent();
        }


        public string RES_FOLDER_PATH = "";
        public string RES_IMAGES_PATH_CURRENT = "";

        private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {

        }

        private void splitContainer1_Panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void ImageResourceForm_Load(object sender, EventArgs e)
        {
            //cuurentpath.Text = webBrowser2.DataBindings.Count.ToString();
            webBrowser2.Navigate( RES_FOLDER_PATH );

            

        }

        //############

            //unuse for now 
        public System.Collections.Specialized.StringCollection
    SwapClipboardFileDropList( System.Collections.Specialized.StringCollection replacementList)
        {
            System.Collections.Specialized.StringCollection returnList = null;
            if (Clipboard.ContainsFileDropList())
            {
                returnList = Clipboard.GetFileDropList();
                Clipboard.SetFileDropList(replacementList);
            }
            return returnList;
        }



        //################

        private void webBrowser2_PreviewKeyDown(object sender, PreviewKeyDownEventArgs e)
        {



           // cuurentpath.Text = SwapClipboardFileDropList(System.Collections.Specialized.StringCollection s);


        }
        int onlyOne = 0;
        private void webBrowser2_Navigating(object sender, WebBrowserNavigatingEventArgs e)
        {


            if (onlyOne == 0)
            {

                Console.Write("PASS");
                onlyOne++;

            }
            else {

                Console.Write(e.Url);
                webBrowser1.Navigate(e.Url);
                e.Cancel = true; // Cancels navigation

            }


        }










   
    }
}
