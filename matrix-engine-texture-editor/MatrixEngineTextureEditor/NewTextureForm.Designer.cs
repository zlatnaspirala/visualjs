
namespace matrix_engine {
    partial class NewTextureForm {
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
            this.w = new System.Windows.Forms.Button();
            this.textureProjectName = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // w
            // 
            this.w.BackColor = System.Drawing.Color.Black;
            this.w.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.w.Font = new System.Drawing.Font("Stormfaze", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.w.Location = new System.Drawing.Point(145, 141);
            this.w.Name = "w";
            this.w.Size = new System.Drawing.Size(403, 31);
            this.w.TabIndex = 2;
            this.w.Text = "Clone and Install matrix-engine library";
            this.w.UseVisualStyleBackColor = false;
            this.w.Click += new System.EventHandler(this.w_Click);
            // 
            // textureProjectName
            // 
            this.textureProjectName.BackColor = System.Drawing.Color.Black;
            this.textureProjectName.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textureProjectName.Font = new System.Drawing.Font("Stormfaze", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textureProjectName.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.textureProjectName.Location = new System.Drawing.Point(441, 100);
            this.textureProjectName.Multiline = true;
            this.textureProjectName.Name = "textureProjectName";
            this.textureProjectName.Size = new System.Drawing.Size(132, 23);
            this.textureProjectName.TabIndex = 3;
            this.textureProjectName.Text = "matrixengine";
            this.textureProjectName.Visible = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(154, 82);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(376, 15);
            this.label1.TabIndex = 4;
            this.label1.Text = "git clone https://github.com/zlatnaspirala/matrix-engine";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Stormfaze", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(158, 44);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(371, 29);
            this.label2.TabIndex = 5;
            this.label2.Text = "Install dep [matrix-engine]";
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackgroundImage = global::matrix_engine.Properties.Resources.android_icon;
            this.pictureBox1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.pictureBox1.Location = new System.Drawing.Point(12, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(103, 100);
            this.pictureBox1.TabIndex = 10;
            this.pictureBox1.TabStop = false;
            // 
            // NewTextureForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(583, 200);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textureProjectName);
            this.Controls.Add(this.w);
            this.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.Lime;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "NewTextureForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "[Matrix-Engine-Gui-Tool] Install dep node library";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

            }

        #endregion
        private System.Windows.Forms.Button w;
        private System.Windows.Forms.TextBox textureProjectName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBox1;
    }
    }