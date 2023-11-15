
namespace matrix_engine {
    partial class EditorConfig {
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
            this.CODE_EDITOR = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // CODE_EDITOR
            // 
            this.CODE_EDITOR.BackColor = System.Drawing.Color.Black;
            this.CODE_EDITOR.Font = new System.Drawing.Font("Stormfaze", 8.999999F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.CODE_EDITOR.ForeColor = System.Drawing.Color.Lime;
            this.CODE_EDITOR.Location = new System.Drawing.Point(256, 12);
            this.CODE_EDITOR.Name = "CODE_EDITOR";
            this.CODE_EDITOR.Size = new System.Drawing.Size(649, 433);
            this.CODE_EDITOR.TabIndex = 1;
            this.CODE_EDITOR.Text = "";
            // 
            // EditorConfig
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(917, 503);
            this.Controls.Add(this.CODE_EDITOR);
            this.Name = "EditorConfig";
            this.Text = "EditorConfig";
            this.Load += new System.EventHandler(this.EditorConfig_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.RichTextBox CODE_EDITOR;
    }
}