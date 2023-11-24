using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows.Forms;

namespace matrix_engine {

    public partial class ResourceVJS3 : Form {
        public static class NativeMethods {
            public const uint LVM_FIRST = 0x1000;
            public const uint LVM_GETIMAGELIST = (LVM_FIRST + 2);
            public const uint LVM_SETIMAGELIST = (LVM_FIRST + 3);

            public const uint LVSIL_NORMAL = 0;
            public const uint LVSIL_SMALL = 1;
            public const uint LVSIL_STATE = 2;
            public const uint LVSIL_GROUPHEADER = 3;

            [DllImport("user32")]
            public static extern IntPtr SendMessage(IntPtr hWnd,
                                                    uint msg,
                                                    uint wParam,
                                                    IntPtr lParam);

            [DllImport("comctl32")]
            public static extern bool ImageList_Destroy(IntPtr hImageList);

            public const uint SHGFI_DISPLAYNAME = 0x200;
            public const uint SHGFI_ICON = 0x200;
            public const uint SHGFI_LARGEICON = 0x0;
            public const uint SHGFI_SMALLICON = 0x1;
            public const uint SHGFI_SYSICONINDEX = 0x4000;

            [StructLayout(LayoutKind.Sequential)]
            public struct SHFILEINFO {
                public IntPtr hIcon;
                public int iIcon;
                public uint dwAttributes;
                [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 460 /* MAX_PATH */)]
                public string szDisplayName;
                [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 80)]
                public string szTypeName;
            };

            [DllImport("shell32")]
            public static extern IntPtr SHGetFileInfo(string pszPath,
                                                      uint dwFileAttributes,
                                                      ref SHFILEINFO psfi,
                                                      uint cbSizeFileInfo,
                                                      uint uFlags);

            [DllImport("uxtheme", CharSet = CharSet.Unicode)]
            public static extern int SetWindowTheme(IntPtr hWnd,
                                                    string pszSubAppName,
                                                    string pszSubIdList);
        }

        static int Y_POS = 0;
        string RES_PATH = "";
        MatrixEngineGUI MAINFORM;
        public ResourceVJS3(String P, MatrixEngineGUI MAINFORM_) {
            InitializeComponent();
            // test
            // ------------------------------
            RES_PATH = P + @"2DTextureEditor\res\animations\";
            labelPath.Text = RES_PATH;
            MAINFORM = MAINFORM_;
            Y_POS = Location.Y;
        }

        private void ResourceVJS3_Load(object sender, EventArgs e) {
            FILEPREVIEW.Navigate(RES_PATH);

            toolTip1.SetToolTip(this.BUILDBTN, "Resource filename or folder cant be with `-` for example  image-test1.png - To make it work rename to image_test1.png !");
            toolTip1.SetToolTip(this.hideMe, "Hide Resource Form.");
            toolTip1.SetToolTip(this.ADDNEWIMAGE, "Select one or more images. After selecting new items resource will be builded. All new images goews intro one folder with same name.");
            toolTip1.SetToolTip(this.BACK, "Works only for editable resource navigator.");

            // TEST
            // Obtain a handle to the system image list.
            // Obtain a handle to the system image list.
            NativeMethods.SHFILEINFO shfi = new NativeMethods.SHFILEINFO();
            IntPtr hSysImgList = NativeMethods.SHGetFileInfo("",
                                                             0,
                                                             ref shfi,
                                                             (uint)Marshal.SizeOf(shfi),
                                                             NativeMethods.SHGFI_SYSICONINDEX
                                                              | NativeMethods.SHGFI_LARGEICON);
            Debug.Assert(hSysImgList != IntPtr.Zero);  // cross our fingers and hope to succeed!

            // Set the ListView control to use that image list.
            IntPtr hOldImgList = NativeMethods.SendMessage(listView1.Handle,
                                                           NativeMethods.LVM_SETIMAGELIST,
                                                           NativeMethods.LVSIL_NORMAL,
                                                           hSysImgList);

            // If the ListView control already had an image list, delete the old one.
            if (hOldImgList != IntPtr.Zero) {
                NativeMethods.ImageList_Destroy(hOldImgList);
            }

            // Set up the ListView control's basic properties.
            // Put it in "Details" mode, create a column so that "Details" mode will work,
            // and set its theme so it will look like the one used by Explorer.
            listView1.View = View.LargeIcon;
            listView1.Columns.Add("Name", 300);
            NativeMethods.SetWindowTheme(listView1.Handle, "Explorer", null);

            // Get the items from the file system, and add each of them to the ListView,
            // complete with their corresponding name and icon indices.
            string[] s = Directory.GetFileSystemEntries(RES_PATH);
            foreach (string file in s) {
                IntPtr himl = NativeMethods.SHGetFileInfo(file,
                                                          0,
                                                          ref shfi,
                                                          (uint)Marshal.SizeOf(shfi),
                                                          NativeMethods.SHGFI_DISPLAYNAME
                                                            | NativeMethods.SHGFI_SYSICONINDEX
                                                            | NativeMethods.SHGFI_LARGEICON);
                Debug.Assert(himl == hSysImgList); // should be the same imagelist as the one we set
                listView1.Items.Add(shfi.szDisplayName, shfi.iIcon);
            }
            // END TEST
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

        private void labelPath_Click(object sender, EventArgs e) {

        }

        private void FILEPREVIEW_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e) {

        }

        static Boolean INMOVE = true;

        public Rectangle GetScreen() {
            return Screen.FromControl(this).Bounds;
        }

        private void hideMe_Click(object sender, EventArgs e) {
            Y_POS = Location.Y;
            timer1.Start();
        }

        private void HIDEMEEVENT(object sender, EventArgs e) {
            Y_POS = Y_POS + 5;
            this.Location = new Point(Location.X, Y_POS);
            if (Y_POS > GetScreen().Height) {
                timer1.Stop();
            }
        }

        private void BUILDBTN_Click(object sender, EventArgs e) {
            MAINFORM.buildRes();
        }
    }
}
