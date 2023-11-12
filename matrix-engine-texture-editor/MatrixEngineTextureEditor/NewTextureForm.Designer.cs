
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
            this.SuspendLayout();
            // 
            // w
            // 
            this.w.BackColor = System.Drawing.Color.Black;
            this.w.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.w.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.w.Location = new System.Drawing.Point(67, 189);
            this.w.Name = "w";
            this.w.Size = new System.Drawing.Size(403, 43);
            this.w.TabIndex = 2;
            this.w.Text = "Create";
            this.w.UseVisualStyleBackColor = false;
            this.w.Click += new System.EventHandler(this.w_Click);
            // 
            // textureProjectName
            // 
            this.textureProjectName.BackColor = System.Drawing.Color.Black;
            this.textureProjectName.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textureProjectName.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textureProjectName.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.textureProjectName.Location = new System.Drawing.Point(66, 136);
            this.textureProjectName.Multiline = true;
            this.textureProjectName.Name = "textureProjectName";
            this.textureProjectName.Size = new System.Drawing.Size(404, 39);
            this.textureProjectName.TabIndex = 3;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Stormfaze", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(63, 111);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(282, 19);
            this.label1.TabIndex = 4;
            this.label1.Text = "Enter name of texture-project";
            // 
            // NewTextureForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(520, 347);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textureProjectName);
            this.Controls.Add(this.w);
            this.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.Lime;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "NewTextureForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "New Texture Form [Matrix-Engine-Gui-Tool]";
            this.ResumeLayout(false);
            this.PerformLayout();

            }

        #endregion
        private System.Windows.Forms.Button w;
        private System.Windows.Forms.TextBox textureProjectName;
        private System.Windows.Forms.Label label1;
        }
    }