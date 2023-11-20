
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
            this.FILEPREVIEW = new System.Windows.Forms.WebBrowser();
            this.labelPath = new System.Windows.Forms.Label();
            this.BACK = new System.Windows.Forms.Button();
            this.ADDNEWIMAGE = new System.Windows.Forms.Button();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.SuspendLayout();
            // 
            // FILEPREVIEW
            // 
            this.FILEPREVIEW.Location = new System.Drawing.Point(3, 41);
            this.FILEPREVIEW.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.FILEPREVIEW.MinimumSize = new System.Drawing.Size(33, 25);
            this.FILEPREVIEW.Name = "FILEPREVIEW";
            this.FILEPREVIEW.Size = new System.Drawing.Size(776, 370);
            this.FILEPREVIEW.TabIndex = 0;
            // 
            // labelPath
            // 
            this.labelPath.AutoSize = true;
            this.labelPath.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.labelPath.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelPath.Location = new System.Drawing.Point(4, 415);
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
            this.BACK.Location = new System.Drawing.Point(3, 5);
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
            this.ADDNEWIMAGE.Location = new System.Drawing.Point(77, 5);
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
            // ResourceVJS3
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(783, 430);
            this.Controls.Add(this.ADDNEWIMAGE);
            this.Controls.Add(this.BACK);
            this.Controls.Add(this.labelPath);
            this.Controls.Add(this.FILEPREVIEW);
            this.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.Lime;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Name = "ResourceVJS3";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "ResourceVJS3";
            this.Load += new System.EventHandler(this.ResourceVJS3_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.WebBrowser FILEPREVIEW;
        private System.Windows.Forms.Label labelPath;
        private System.Windows.Forms.Button BACK;
        private System.Windows.Forms.Button ADDNEWIMAGE;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
    }
}