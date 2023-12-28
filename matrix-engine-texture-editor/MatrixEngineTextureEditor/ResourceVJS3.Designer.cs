
namespace matrix_engine {
    partial class ResourceVJS3 {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing) {
            if (disposing && (components != null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            this.components = new System.ComponentModel.Container();
            this.FILEPREVIEW = new System.Windows.Forms.WebBrowser();
            this.labelPath = new System.Windows.Forms.Label();
            this.BACK = new System.Windows.Forms.Button();
            this.ADDNEWIMAGE = new System.Windows.Forms.Button();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.directoryEntry1 = new System.DirectoryServices.DirectoryEntry();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.hideMe = new System.Windows.Forms.Button();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.BUILDBTN = new System.Windows.Forms.Button();
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.FILEPREVIEW3D = new System.Windows.Forms.WebBrowser();
            this.DESC = new System.Windows.Forms.Label();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.SuspendLayout();
            // 
            // FILEPREVIEW
            // 
            this.FILEPREVIEW.Dock = System.Windows.Forms.DockStyle.Fill;
            this.FILEPREVIEW.Location = new System.Drawing.Point(3, 3);
            this.FILEPREVIEW.Margin = new System.Windows.Forms.Padding(0);
            this.FILEPREVIEW.MinimumSize = new System.Drawing.Size(33, 25);
            this.FILEPREVIEW.Name = "FILEPREVIEW";
            this.FILEPREVIEW.Size = new System.Drawing.Size(1319, 272);
            this.FILEPREVIEW.TabIndex = 0;
            this.FILEPREVIEW.DocumentCompleted += new System.Windows.Forms.WebBrowserDocumentCompletedEventHandler(this.FILEPREVIEW_DocumentCompleted);
            // 
            // labelPath
            // 
            this.labelPath.AutoSize = true;
            this.labelPath.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.labelPath.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelPath.Location = new System.Drawing.Point(0, 351);
            this.labelPath.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.labelPath.Name = "labelPath";
            this.labelPath.Size = new System.Drawing.Size(191, 14);
            this.labelPath.TabIndex = 9;
            this.labelPath.Text = "RUN MAtrixEngine Tool editor\r\n";
            this.labelPath.Click += new System.EventHandler(this.labelPath_Click);
            // 
            // BACK
            // 
            this.BACK.BackColor = System.Drawing.Color.Black;
            this.BACK.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BACK.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.BACK.ForeColor = System.Drawing.Color.DarkOrange;
            this.BACK.Location = new System.Drawing.Point(701, 6);
            this.BACK.Name = "BACK";
            this.BACK.Size = new System.Drawing.Size(68, 29);
            this.BACK.TabIndex = 13;
            this.BACK.Text = "BACK";
            this.BACK.UseVisualStyleBackColor = false;
            this.BACK.Click += new System.EventHandler(this.BACK_Click);
            // 
            // ADDNEWIMAGE
            // 
            this.ADDNEWIMAGE.BackColor = System.Drawing.Color.Black;
            this.ADDNEWIMAGE.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ADDNEWIMAGE.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ADDNEWIMAGE.ForeColor = System.Drawing.Color.DarkOrange;
            this.ADDNEWIMAGE.Location = new System.Drawing.Point(775, 6);
            this.ADDNEWIMAGE.Name = "ADDNEWIMAGE";
            this.ADDNEWIMAGE.Size = new System.Drawing.Size(187, 29);
            this.ADDNEWIMAGE.TabIndex = 14;
            this.ADDNEWIMAGE.Text = "Add new image/images";
            this.ADDNEWIMAGE.UseVisualStyleBackColor = false;
            this.ADDNEWIMAGE.Click += new System.EventHandler(this.ADDNEWIMAGE_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            this.openFileDialog1.Multiselect = true;
            this.openFileDialog1.Title = "Select new image from local disk.";
            this.openFileDialog1.FileOk += new System.ComponentModel.CancelEventHandler(this.openFileDialog1_FileOk);
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.tabControl1.Location = new System.Drawing.Point(0, 42);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(1333, 307);
            this.tabControl1.TabIndex = 16;
            this.tabControl1.SelectedIndexChanged += new System.EventHandler(this.tabControl1_SelectedIndexChanged);
            // 
            // tabPage1
            // 
            this.tabPage1.BackColor = System.Drawing.Color.Maroon;
            this.tabPage1.Controls.Add(this.BACK);
            this.tabPage1.Controls.Add(this.ADDNEWIMAGE);
            this.tabPage1.Controls.Add(this.BUILDBTN);
            this.tabPage1.Controls.Add(this.FILEPREVIEW);
            this.tabPage1.Location = new System.Drawing.Point(4, 25);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(1325, 278);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "2D resources [visualjs]";
            // 
            // hideMe
            // 
            this.hideMe.BackColor = System.Drawing.Color.Black;
            this.hideMe.Dock = System.Windows.Forms.DockStyle.Right;
            this.hideMe.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.hideMe.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.hideMe.ForeColor = System.Drawing.Color.DarkOrange;
            this.hideMe.Location = new System.Drawing.Point(1102, 0);
            this.hideMe.Name = "hideMe";
            this.hideMe.Size = new System.Drawing.Size(231, 42);
            this.hideMe.TabIndex = 17;
            this.hideMe.Text = "Hide";
            this.hideMe.UseVisualStyleBackColor = false;
            this.hideMe.Click += new System.EventHandler(this.hideMe_Click);
            // 
            // timer1
            // 
            this.timer1.Interval = 1;
            this.timer1.Tick += new System.EventHandler(this.HIDEMEEVENT);
            // 
            // BUILDBTN
            // 
            this.BUILDBTN.BackColor = System.Drawing.Color.Black;
            this.BUILDBTN.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BUILDBTN.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.BUILDBTN.ForeColor = System.Drawing.Color.DarkOrange;
            this.BUILDBTN.Location = new System.Drawing.Point(968, 6);
            this.BUILDBTN.Name = "BUILDBTN";
            this.BUILDBTN.Size = new System.Drawing.Size(68, 29);
            this.BUILDBTN.TabIndex = 18;
            this.BUILDBTN.Text = "BUILD";
            this.BUILDBTN.UseVisualStyleBackColor = false;
            this.BUILDBTN.Click += new System.EventHandler(this.BUILDBTN_Click);
            // 
            // toolTip1
            // 
            this.toolTip1.ToolTipIcon = System.Windows.Forms.ToolTipIcon.Warning;
            this.toolTip1.ToolTipTitle = "Help and warns";
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.FILEPREVIEW3D);
            this.tabPage2.Location = new System.Drawing.Point(4, 25);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Size = new System.Drawing.Size(1325, 278);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "3D Resources [matrix-engine]";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // FILEPREVIEW3D
            // 
            this.FILEPREVIEW3D.Dock = System.Windows.Forms.DockStyle.Fill;
            this.FILEPREVIEW3D.Location = new System.Drawing.Point(0, 0);
            this.FILEPREVIEW3D.Margin = new System.Windows.Forms.Padding(0);
            this.FILEPREVIEW3D.MinimumSize = new System.Drawing.Size(33, 25);
            this.FILEPREVIEW3D.Name = "FILEPREVIEW3D";
            this.FILEPREVIEW3D.Size = new System.Drawing.Size(1325, 278);
            this.FILEPREVIEW3D.TabIndex = 1;
            // 
            // DESC
            // 
            this.DESC.AutoSize = true;
            this.DESC.ForeColor = System.Drawing.Color.DarkOrange;
            this.DESC.Location = new System.Drawing.Point(39, 13);
            this.DESC.Name = "DESC";
            this.DESC.Size = new System.Drawing.Size(51, 16);
            this.DESC.TabIndex = 18;
            this.DESC.Text = "DESC";
            // 
            // ResourceVJS3
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.BackgroundImage = global::matrix_engine.Properties.Resources.res2;
            this.ClientSize = new System.Drawing.Size(1333, 349);
            this.Controls.Add(this.DESC);
            this.Controls.Add(this.hideMe);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.labelPath);
            this.DoubleBuffered = true;
            this.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.Lime;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Name = "ResourceVJS3";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "ResourceVJS3";
            this.TopMost = true;
            this.Load += new System.EventHandler(this.ResourceVJS3_Load);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.WebBrowser FILEPREVIEW;
        private System.Windows.Forms.Label labelPath;
        private System.Windows.Forms.Button BACK;
        private System.Windows.Forms.Button ADDNEWIMAGE;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.DirectoryServices.DirectoryEntry directoryEntry1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.Button hideMe;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.Button BUILDBTN;
        private System.Windows.Forms.ToolTip toolTip1;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.WebBrowser FILEPREVIEW3D;
        private System.Windows.Forms.Label DESC;
    }
}