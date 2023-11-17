
namespace matrix_engine {
    partial class LoadForm {
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
            this.label1 = new System.Windows.Forms.Label();
            this.textureProjectName = new System.Windows.Forms.TextBox();
            this.w = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(176, 69);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(293, 48);
            this.label1.TabIndex = 7;
            this.label1.Text = "- Run simple web server on port 8080\r\n- Run node editor VJS3 \r\n- Run js build ";
            // 
            // textureProjectName
            // 
            this.textureProjectName.BackColor = System.Drawing.Color.Black;
            this.textureProjectName.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textureProjectName.Enabled = false;
            this.textureProjectName.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textureProjectName.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.textureProjectName.Location = new System.Drawing.Point(179, 128);
            this.textureProjectName.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.textureProjectName.Name = "textureProjectName";
            this.textureProjectName.Size = new System.Drawing.Size(318, 16);
            this.textureProjectName.TabIndex = 6;
            this.textureProjectName.Text = "matrixengine";
            // 
            // w
            // 
            this.w.BackColor = System.Drawing.Color.Black;
            this.w.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.w.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.w.Location = new System.Drawing.Point(179, 163);
            this.w.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.w.Name = "w";
            this.w.Size = new System.Drawing.Size(318, 29);
            this.w.TabIndex = 5;
            this.w.Text = "RUN";
            this.w.UseVisualStyleBackColor = false;
            this.w.Click += new System.EventHandler(this.w_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Orbitron", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(159, 13);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(357, 25);
            this.label2.TabIndex = 8;
            this.label2.Text = "RUN MAtrixEngine Tool editor\r\n";
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackgroundImage = global::matrix_engine.Properties.Resources.android_icon;
            this.pictureBox1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.pictureBox1.Location = new System.Drawing.Point(12, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(103, 100);
            this.pictureBox1.TabIndex = 9;
            this.pictureBox1.TabStop = false;
            // 
            // LoadForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(533, 205);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textureProjectName);
            this.Controls.Add(this.w);
            this.Controls.Add(this.pictureBox1);
            this.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.Lime;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Name = "LoadForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Load textureEditor project";
            this.TopMost = true;
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

            }

        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textureProjectName;
        private System.Windows.Forms.Button w;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBox1;
    }
    }