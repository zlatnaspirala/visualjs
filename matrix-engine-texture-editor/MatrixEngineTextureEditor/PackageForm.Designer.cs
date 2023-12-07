
namespace matrix_engine {
    partial class PackageForm {
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
            this.buildcanvas2dBtn = new System.Windows.Forms.Button();
            this.buildForMEngineBtn = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.BuildForHybrid = new System.Windows.Forms.Button();
            this.webAppExportPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.openfolderWebApp = new System.Windows.Forms.Button();
            this.statusBuildVJS3 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // buildcanvas2dBtn
            // 
            this.buildcanvas2dBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.buildcanvas2dBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.buildcanvas2dBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buildcanvas2dBtn.ForeColor = System.Drawing.Color.Black;
            this.buildcanvas2dBtn.Image = global::matrix_engine.Properties.Resources.html564;
            this.buildcanvas2dBtn.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.buildcanvas2dBtn.Location = new System.Drawing.Point(532, 153);
            this.buildcanvas2dBtn.Name = "buildcanvas2dBtn";
            this.buildcanvas2dBtn.Size = new System.Drawing.Size(503, 80);
            this.buildcanvas2dBtn.TabIndex = 2;
            this.buildcanvas2dBtn.Text = "Export Canvas2d web app";
            this.buildcanvas2dBtn.UseVisualStyleBackColor = false;
            this.buildcanvas2dBtn.Click += new System.EventHandler(this.buildcanvas2dBtn_Click);
            // 
            // buildForMEngineBtn
            // 
            this.buildForMEngineBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.buildForMEngineBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.buildForMEngineBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buildForMEngineBtn.ForeColor = System.Drawing.Color.Black;
            this.buildForMEngineBtn.Image = global::matrix_engine.Properties.Resources.me;
            this.buildForMEngineBtn.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.buildForMEngineBtn.Location = new System.Drawing.Point(532, 239);
            this.buildForMEngineBtn.Name = "buildForMEngineBtn";
            this.buildForMEngineBtn.Size = new System.Drawing.Size(503, 80);
            this.buildForMEngineBtn.TabIndex = 3;
            this.buildForMEngineBtn.Text = "Export for matrix-engine webgl web app";
            this.buildForMEngineBtn.UseVisualStyleBackColor = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Orbitron", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.OrangeRed;
            this.label1.Location = new System.Drawing.Point(12, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(308, 25);
            this.label1.TabIndex = 9;
            this.label1.Text = "Matrix Engine - Packager";
            // 
            // BuildForHybrid
            // 
            this.BuildForHybrid.BackColor = System.Drawing.Color.DarkOrange;
            this.BuildForHybrid.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.BuildForHybrid.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BuildForHybrid.ForeColor = System.Drawing.Color.Black;
            this.BuildForHybrid.Image = global::matrix_engine.Properties.Resources.windows_logo_7753;
            this.BuildForHybrid.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.BuildForHybrid.Location = new System.Drawing.Point(532, 325);
            this.BuildForHybrid.Name = "BuildForHybrid";
            this.BuildForHybrid.Size = new System.Drawing.Size(503, 81);
            this.BuildForHybrid.TabIndex = 11;
            this.BuildForHybrid.Text = "Export for windows desktop - hybrid app";
            this.BuildForHybrid.UseVisualStyleBackColor = false;
            this.BuildForHybrid.Click += new System.EventHandler(this.BuildForHybrid_Click);
            // 
            // webAppExportPath
            // 
            this.webAppExportPath.BackColor = System.Drawing.Color.Black;
            this.webAppExportPath.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.webAppExportPath.ForeColor = System.Drawing.Color.DarkOrange;
            this.webAppExportPath.Location = new System.Drawing.Point(17, 172);
            this.webAppExportPath.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.webAppExportPath.Name = "webAppExportPath";
            this.webAppExportPath.Size = new System.Drawing.Size(507, 21);
            this.webAppExportPath.TabIndex = 31;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.OrangeRed;
            this.label2.Location = new System.Drawing.Point(14, 153);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(163, 15);
            this.label2.TabIndex = 32;
            this.label2.Text = "Export destination path:";
            // 
            // openfolderWebApp
            // 
            this.openfolderWebApp.BackColor = System.Drawing.Color.OrangeRed;
            this.openfolderWebApp.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.openfolderWebApp.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.openfolderWebApp.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.openfolderWebApp.ForeColor = System.Drawing.Color.Black;
            this.openfolderWebApp.Location = new System.Drawing.Point(17, 200);
            this.openfolderWebApp.Name = "openfolderWebApp";
            this.openfolderWebApp.Size = new System.Drawing.Size(101, 25);
            this.openfolderWebApp.TabIndex = 33;
            this.openfolderWebApp.Text = "open folder";
            this.openfolderWebApp.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.openfolderWebApp.UseVisualStyleBackColor = false;
            this.openfolderWebApp.Click += new System.EventHandler(this.button1_Click);
            // 
            // statusBuildVJS3
            // 
            this.statusBuildVJS3.AutoSize = true;
            this.statusBuildVJS3.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.statusBuildVJS3.ForeColor = System.Drawing.Color.OrangeRed;
            this.statusBuildVJS3.Location = new System.Drawing.Point(438, 153);
            this.statusBuildVJS3.Name = "statusBuildVJS3";
            this.statusBuildVJS3.Size = new System.Drawing.Size(86, 15);
            this.statusBuildVJS3.TabIndex = 34;
            this.statusBuildVJS3.Text = "Status build";
            // 
            // PackageForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(1059, 474);
            this.Controls.Add(this.statusBuildVJS3);
            this.Controls.Add(this.openfolderWebApp);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.webAppExportPath);
            this.Controls.Add(this.BuildForHybrid);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.buildForMEngineBtn);
            this.Controls.Add(this.buildcanvas2dBtn);
            this.Font = new System.Drawing.Font("Orbitron", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(255)))));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.Name = "PackageForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "MatrixEngine Package Form";
            this.TopMost = true;
            this.Load += new System.EventHandler(this.PackageForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        public System.Windows.Forms.Button buildcanvas2dBtn;
        public System.Windows.Forms.Button buildForMEngineBtn;
        private System.Windows.Forms.Label label1;
        public System.Windows.Forms.Button BuildForHybrid;
        public System.Windows.Forms.TextBox webAppExportPath;
        private System.Windows.Forms.Label label2;
        public System.Windows.Forms.Button openfolderWebApp;
        public System.Windows.Forms.Label statusBuildVJS3;
    }
}