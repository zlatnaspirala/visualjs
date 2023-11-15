
namespace matrix_engine {
    partial class ScritpEditor {
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
            this.label1 = new System.Windows.Forms.Label();
            this.SCRIPT_SRC = new System.Windows.Forms.Label();
            this.saveBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // CODE_EDITOR
            // 
            this.CODE_EDITOR.BackColor = System.Drawing.Color.Black;
            this.CODE_EDITOR.Font = new System.Drawing.Font("Stormfaze", 8.999999F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.CODE_EDITOR.ForeColor = System.Drawing.Color.Lime;
            this.CODE_EDITOR.Location = new System.Drawing.Point(12, 54);
            this.CODE_EDITOR.Name = "CODE_EDITOR";
            this.CODE_EDITOR.Size = new System.Drawing.Size(649, 433);
            this.CODE_EDITOR.TabIndex = 0;
            this.CODE_EDITOR.Text = "";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Stormfaze", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Lime;
            this.label1.Location = new System.Drawing.Point(12, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(289, 29);
            this.label1.TabIndex = 9;
            this.label1.Text = "VJS3 CODE / Canvas2d";
            // 
            // SCRIPT_SRC
            // 
            this.SCRIPT_SRC.AutoSize = true;
            this.SCRIPT_SRC.Font = new System.Drawing.Font("Stormfaze", 9.749999F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.SCRIPT_SRC.ForeColor = System.Drawing.Color.Lime;
            this.SCRIPT_SRC.Location = new System.Drawing.Point(12, 492);
            this.SCRIPT_SRC.Name = "SCRIPT_SRC";
            this.SCRIPT_SRC.Size = new System.Drawing.Size(71, 16);
            this.SCRIPT_SRC.TabIndex = 10;
            this.SCRIPT_SRC.Text = "FILE PATH";
            // 
            // saveBtn
            // 
            this.saveBtn.BackColor = System.Drawing.Color.Black;
            this.saveBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.saveBtn.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.saveBtn.ForeColor = System.Drawing.Color.Lime;
            this.saveBtn.Location = new System.Drawing.Point(421, 493);
            this.saveBtn.Name = "saveBtn";
            this.saveBtn.Size = new System.Drawing.Size(68, 29);
            this.saveBtn.TabIndex = 13;
            this.saveBtn.Text = "SAVE";
            this.saveBtn.UseVisualStyleBackColor = false;
            this.saveBtn.Click += new System.EventHandler(this.saveBtn_Click);
            // 
            // ScritpEditor
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(673, 530);
            this.Controls.Add(this.saveBtn);
            this.Controls.Add(this.SCRIPT_SRC);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.CODE_EDITOR);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "ScritpEditor";
            this.Text = "ScritpEditor";
            this.TopMost = true;
            this.Load += new System.EventHandler(this.ScritpEditor_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.RichTextBox CODE_EDITOR;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label SCRIPT_SRC;
        private System.Windows.Forms.Button saveBtn;
    }
}