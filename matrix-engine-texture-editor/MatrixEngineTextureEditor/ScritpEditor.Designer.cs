﻿
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
            this.components = new System.ComponentModel.Container();
            this.CODE_EDITOR = new System.Windows.Forms.RichTextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.SCRIPT_SRC = new System.Windows.Forms.Label();
            this.saveBtn = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.prepareForPackBtn = new System.Windows.Forms.Button();
            this.backToCodingBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // CODE_EDITOR
            // 
            this.CODE_EDITOR.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.CODE_EDITOR.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.CODE_EDITOR.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.CODE_EDITOR.ForeColor = System.Drawing.Color.Black;
            this.CODE_EDITOR.Location = new System.Drawing.Point(2, 44);
            this.CODE_EDITOR.Name = "CODE_EDITOR";
            this.CODE_EDITOR.Size = new System.Drawing.Size(690, 511);
            this.CODE_EDITOR.TabIndex = 0;
            this.CODE_EDITOR.Text = "";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Orbitron", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.DarkOrange;
            this.label1.Location = new System.Drawing.Point(7, 5);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(264, 25);
            this.label1.TabIndex = 9;
            this.label1.Text = "VisualJS Code Editor\r\n";
            // 
            // SCRIPT_SRC
            // 
            this.SCRIPT_SRC.AutoSize = true;
            this.SCRIPT_SRC.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.SCRIPT_SRC.ForeColor = System.Drawing.Color.SeaShell;
            this.SCRIPT_SRC.Location = new System.Drawing.Point(2, 27);
            this.SCRIPT_SRC.Name = "SCRIPT_SRC";
            this.SCRIPT_SRC.Size = new System.Drawing.Size(72, 14);
            this.SCRIPT_SRC.TabIndex = 10;
            this.SCRIPT_SRC.Text = "FILE PATH";
            this.SCRIPT_SRC.Click += new System.EventHandler(this.SCRIPT_SRC_Click);
            // 
            // saveBtn
            // 
            this.saveBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.saveBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.saveBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.saveBtn.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.saveBtn.ForeColor = System.Drawing.Color.White;
            this.saveBtn.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.saveBtn.Location = new System.Drawing.Point(493, 558);
            this.saveBtn.Name = "saveBtn";
            this.saveBtn.Size = new System.Drawing.Size(136, 29);
            this.saveBtn.TabIndex = 13;
            this.saveBtn.Text = "SAVE && Refresh";
            this.saveBtn.UseVisualStyleBackColor = false;
            this.saveBtn.Click += new System.EventHandler(this.saveBtn_Click);
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.OrangeRed;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.ForeColor = System.Drawing.Color.White;
            this.button1.Location = new System.Drawing.Point(635, 558);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(57, 29);
            this.button1.TabIndex = 14;
            this.button1.Text = "HIDE";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // prepareForPackBtn
            // 
            this.prepareForPackBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.prepareForPackBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.prepareForPackBtn.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.prepareForPackBtn.ForeColor = System.Drawing.Color.White;
            this.prepareForPackBtn.Image = global::matrix_engine.Properties.Resources.transparentDark20;
            this.prepareForPackBtn.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.prepareForPackBtn.Location = new System.Drawing.Point(2, 558);
            this.prepareForPackBtn.Name = "prepareForPackBtn";
            this.prepareForPackBtn.Size = new System.Drawing.Size(167, 29);
            this.prepareForPackBtn.TabIndex = 16;
            this.prepareForPackBtn.Text = "Prepare for pack";
            this.prepareForPackBtn.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.toolTip1.SetToolTip(this.prepareForPackBtn, "Simple deactivate editor .");
            this.prepareForPackBtn.UseVisualStyleBackColor = false;
            this.prepareForPackBtn.Click += new System.EventHandler(this.prepareForPackBtn_Click);
            // 
            // backToCodingBtn
            // 
            this.backToCodingBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.backToCodingBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.backToCodingBtn.Font = new System.Drawing.Font("Stormfaze", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.backToCodingBtn.ForeColor = System.Drawing.Color.White;
            this.backToCodingBtn.Location = new System.Drawing.Point(172, 558);
            this.backToCodingBtn.Name = "backToCodingBtn";
            this.backToCodingBtn.Size = new System.Drawing.Size(116, 29);
            this.backToCodingBtn.TabIndex = 17;
            this.backToCodingBtn.Text = "Back to coding";
            this.backToCodingBtn.UseVisualStyleBackColor = false;
            this.backToCodingBtn.Click += new System.EventHandler(this.backToCodingBtn_Click);
            // 
            // ScritpEditor
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(694, 590);
            this.Controls.Add(this.backToCodingBtn);
            this.Controls.Add(this.prepareForPackBtn);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.saveBtn);
            this.Controls.Add(this.SCRIPT_SRC);
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
        private System.Windows.Forms.Button saveBtn;
        private System.Windows.Forms.Button button1;
        public System.Windows.Forms.Label SCRIPT_SRC;
        private System.Windows.Forms.ToolTip toolTip1;
        private System.Windows.Forms.Button prepareForPackBtn;
        private System.Windows.Forms.Button backToCodingBtn;
    }
}