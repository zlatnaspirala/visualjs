namespace Visual_JS
{
    partial class plusMinus
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.VALUE = new System.Windows.Forms.TextBox();
            this.buttonPLUS = new System.Windows.Forms.Button();
            this.buttonMINUS = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // VALUE
            // 
            this.VALUE.BackColor = System.Drawing.Color.Black;
            this.VALUE.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.VALUE.Font = new System.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.VALUE.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.VALUE.Location = new System.Drawing.Point(13, 13);
            this.VALUE.Name = "VALUE";
            this.VALUE.Size = new System.Drawing.Size(97, 22);
            this.VALUE.TabIndex = 0;
            this.VALUE.Tag = "";
            this.VALUE.Text = "35";
            this.VALUE.TextChanged += new System.EventHandler(this.VALUE_TextChanged);
            // 
            // buttonPLUS
            // 
            this.buttonPLUS.Location = new System.Drawing.Point(116, 0);
            this.buttonPLUS.Name = "buttonPLUS";
            this.buttonPLUS.Size = new System.Drawing.Size(49, 23);
            this.buttonPLUS.TabIndex = 1;
            this.buttonPLUS.Text = "+";
            this.buttonPLUS.UseVisualStyleBackColor = true;
            this.buttonPLUS.Click += new System.EventHandler(this.buttonPLUS_Click);
            // 
            // buttonMINUS
            // 
            this.buttonMINUS.Location = new System.Drawing.Point(116, 23);
            this.buttonMINUS.Name = "buttonMINUS";
            this.buttonMINUS.Size = new System.Drawing.Size(49, 23);
            this.buttonMINUS.TabIndex = 2;
            this.buttonMINUS.Text = "-";
            this.buttonMINUS.UseVisualStyleBackColor = true;
            this.buttonMINUS.Click += new System.EventHandler(this.buttonMINUS_Click);
            // 
            // plusMinus
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.Controls.Add(this.buttonMINUS);
            this.Controls.Add(this.buttonPLUS);
            this.Controls.Add(this.VALUE);
            this.Name = "plusMinus";
            this.Size = new System.Drawing.Size(176, 48);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox VALUE;
        private System.Windows.Forms.Button buttonPLUS;
        private System.Windows.Forms.Button buttonMINUS;
    }
}
