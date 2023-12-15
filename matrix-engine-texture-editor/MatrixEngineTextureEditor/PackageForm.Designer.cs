
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
            this.buildForAndroid = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.BuildForHybrid = new System.Windows.Forms.Button();
            this.webAppExportPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.openfolderWebApp = new System.Windows.Forms.Button();
            this.statusBuildVJS3 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.statusBuildNATIVE = new System.Windows.Forms.Label();
            this.runLastNATIVEBuildBtn = new System.Windows.Forms.Button();
            this.NATIVEBuildPATH = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.isSelfHost = new System.Windows.Forms.CheckBox();
            this.HOSTPORT = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.openfolderNative = new System.Windows.Forms.Button();
            this.runInChrome = new System.Windows.Forms.Button();
            this.runInFF = new System.Windows.Forms.Button();
            this.runInOpera = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.button2 = new System.Windows.Forms.Button();
            this.ANDROIDSDKPATH = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.setAndroidSDKBtn = new System.Windows.Forms.Button();
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
            this.buildcanvas2dBtn.Location = new System.Drawing.Point(532, 147);
            this.buildcanvas2dBtn.Name = "buildcanvas2dBtn";
            this.buildcanvas2dBtn.Size = new System.Drawing.Size(503, 80);
            this.buildcanvas2dBtn.TabIndex = 2;
            this.buildcanvas2dBtn.Text = "Export Canvas2d web app";
            this.buildcanvas2dBtn.UseVisualStyleBackColor = false;
            this.buildcanvas2dBtn.Click += new System.EventHandler(this.buildcanvas2dBtn_Click);
            // 
            // buildForAndroid
            // 
            this.buildForAndroid.BackColor = System.Drawing.Color.Chocolate;
            this.buildForAndroid.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.buildForAndroid.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buildForAndroid.ForeColor = System.Drawing.Color.Black;
            this.buildForAndroid.Image = global::matrix_engine.Properties.Resources._64x64;
            this.buildForAndroid.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.buildForAndroid.Location = new System.Drawing.Point(532, 479);
            this.buildForAndroid.Name = "buildForAndroid";
            this.buildForAndroid.Size = new System.Drawing.Size(503, 80);
            this.buildForAndroid.TabIndex = 3;
            this.buildForAndroid.Text = "Export webgl web app for Android";
            this.buildForAndroid.UseVisualStyleBackColor = false;
            this.buildForAndroid.Click += new System.EventHandler(this.buildForAndroid_Click);
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
            this.BuildForHybrid.Location = new System.Drawing.Point(532, 306);
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
            this.webAppExportPath.Location = new System.Drawing.Point(17, 148);
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
            this.label2.Location = new System.Drawing.Point(14, 118);
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
            this.openfolderWebApp.Location = new System.Drawing.Point(17, 171);
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
            this.statusBuildVJS3.Location = new System.Drawing.Point(438, 129);
            this.statusBuildVJS3.Name = "statusBuildVJS3";
            this.statusBuildVJS3.Size = new System.Drawing.Size(86, 15);
            this.statusBuildVJS3.TabIndex = 34;
            this.statusBuildVJS3.Text = "Status build";
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.OrangeRed;
            this.button1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.ForeColor = System.Drawing.Color.Black;
            this.button1.Location = new System.Drawing.Point(372, 324);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(152, 25);
            this.button1.TabIndex = 35;
            this.button1.Text = "Configure App config";
            this.button1.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // statusBuildNATIVE
            // 
            this.statusBuildNATIVE.AutoSize = true;
            this.statusBuildNATIVE.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.statusBuildNATIVE.ForeColor = System.Drawing.Color.OrangeRed;
            this.statusBuildNATIVE.Location = new System.Drawing.Point(438, 306);
            this.statusBuildNATIVE.Name = "statusBuildNATIVE";
            this.statusBuildNATIVE.Size = new System.Drawing.Size(86, 15);
            this.statusBuildNATIVE.TabIndex = 36;
            this.statusBuildNATIVE.Text = "Status build";
            // 
            // runLastNATIVEBuildBtn
            // 
            this.runLastNATIVEBuildBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.runLastNATIVEBuildBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.runLastNATIVEBuildBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.runLastNATIVEBuildBtn.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.runLastNATIVEBuildBtn.ForeColor = System.Drawing.Color.Black;
            this.runLastNATIVEBuildBtn.Location = new System.Drawing.Point(372, 355);
            this.runLastNATIVEBuildBtn.Name = "runLastNATIVEBuildBtn";
            this.runLastNATIVEBuildBtn.Size = new System.Drawing.Size(152, 25);
            this.runLastNATIVEBuildBtn.TabIndex = 37;
            this.runLastNATIVEBuildBtn.Text = "Run last build";
            this.runLastNATIVEBuildBtn.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.runLastNATIVEBuildBtn.UseVisualStyleBackColor = false;
            this.runLastNATIVEBuildBtn.Click += new System.EventHandler(this.runLastNATIVEBuildBtn_Click);
            // 
            // NATIVEBuildPATH
            // 
            this.NATIVEBuildPATH.BackColor = System.Drawing.Color.Black;
            this.NATIVEBuildPATH.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.NATIVEBuildPATH.ForeColor = System.Drawing.Color.DarkOrange;
            this.NATIVEBuildPATH.Location = new System.Drawing.Point(17, 387);
            this.NATIVEBuildPATH.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.NATIVEBuildPATH.Name = "NATIVEBuildPATH";
            this.NATIVEBuildPATH.Size = new System.Drawing.Size(507, 21);
            this.NATIVEBuildPATH.TabIndex = 38;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.ForeColor = System.Drawing.Color.OrangeRed;
            this.label3.Location = new System.Drawing.Point(14, 368);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(108, 15);
            this.label3.TabIndex = 39;
            this.label3.Text = "Last build path:";
            // 
            // isSelfHost
            // 
            this.isSelfHost.AutoSize = true;
            this.isSelfHost.ForeColor = System.Drawing.Color.DarkOrange;
            this.isSelfHost.Location = new System.Drawing.Point(214, 327);
            this.isSelfHost.Name = "isSelfHost";
            this.isSelfHost.Size = new System.Drawing.Size(141, 20);
            this.isSelfHost.TabIndex = 40;
            this.isSelfHost.Text = "run http server";
            this.isSelfHost.UseVisualStyleBackColor = true;
            this.isSelfHost.CheckedChanged += new System.EventHandler(this.isSelfHost_CheckedChanged);
            // 
            // HOSTPORT
            // 
            this.HOSTPORT.BackColor = System.Drawing.Color.Black;
            this.HOSTPORT.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.HOSTPORT.ForeColor = System.Drawing.Color.DarkOrange;
            this.HOSTPORT.Location = new System.Drawing.Point(262, 358);
            this.HOSTPORT.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.HOSTPORT.Name = "HOSTPORT";
            this.HOSTPORT.Size = new System.Drawing.Size(70, 21);
            this.HOSTPORT.TabIndex = 41;
            this.HOSTPORT.Text = "80";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.ForeColor = System.Drawing.Color.OrangeRed;
            this.label4.Location = new System.Drawing.Point(216, 360);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(38, 15);
            this.label4.TabIndex = 42;
            this.label4.Text = "Port:";
            // 
            // openfolderNative
            // 
            this.openfolderNative.BackColor = System.Drawing.Color.OrangeRed;
            this.openfolderNative.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.openfolderNative.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.openfolderNative.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.openfolderNative.ForeColor = System.Drawing.Color.Black;
            this.openfolderNative.Location = new System.Drawing.Point(17, 415);
            this.openfolderNative.Name = "openfolderNative";
            this.openfolderNative.Size = new System.Drawing.Size(101, 25);
            this.openfolderNative.TabIndex = 43;
            this.openfolderNative.Text = "open folder";
            this.openfolderNative.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.openfolderNative.UseVisualStyleBackColor = false;
            this.openfolderNative.Click += new System.EventHandler(this.openfolderNative_Click);
            // 
            // runInChrome
            // 
            this.runInChrome.BackColor = System.Drawing.Color.OrangeRed;
            this.runInChrome.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.runInChrome.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.runInChrome.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.runInChrome.ForeColor = System.Drawing.Color.Black;
            this.runInChrome.Location = new System.Drawing.Point(374, 176);
            this.runInChrome.Name = "runInChrome";
            this.runInChrome.Size = new System.Drawing.Size(152, 25);
            this.runInChrome.TabIndex = 44;
            this.runInChrome.Text = "Run in chrome";
            this.runInChrome.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.runInChrome.UseVisualStyleBackColor = false;
            this.runInChrome.Click += new System.EventHandler(this.runInChrome_Click);
            // 
            // runInFF
            // 
            this.runInFF.BackColor = System.Drawing.Color.OrangeRed;
            this.runInFF.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.runInFF.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.runInFF.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.runInFF.ForeColor = System.Drawing.Color.Black;
            this.runInFF.Location = new System.Drawing.Point(374, 207);
            this.runInFF.Name = "runInFF";
            this.runInFF.Size = new System.Drawing.Size(152, 25);
            this.runInFF.TabIndex = 45;
            this.runInFF.Text = "Run in firefox";
            this.runInFF.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.runInFF.UseVisualStyleBackColor = false;
            this.runInFF.Click += new System.EventHandler(this.runInFF_Click);
            // 
            // runInOpera
            // 
            this.runInOpera.BackColor = System.Drawing.Color.OrangeRed;
            this.runInOpera.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.runInOpera.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.runInOpera.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.runInOpera.ForeColor = System.Drawing.Color.Black;
            this.runInOpera.Location = new System.Drawing.Point(219, 176);
            this.runInOpera.Name = "runInOpera";
            this.runInOpera.Size = new System.Drawing.Size(152, 25);
            this.runInOpera.TabIndex = 46;
            this.runInOpera.Text = "Run in opera";
            this.runInOpera.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.runInOpera.UseVisualStyleBackColor = false;
            this.runInOpera.Click += new System.EventHandler(this.runInOpera_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.ForeColor = System.Drawing.Color.OrangeRed;
            this.label5.Location = new System.Drawing.Point(413, 88);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(231, 22);
            this.label5.TabIndex = 47;
            this.label5.Text = "web app - canvas2d";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.OrangeRed;
            this.label6.Location = new System.Drawing.Point(413, 443);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(271, 22);
            this.label6.TabIndex = 48;
            this.label6.Text = "canvas2D app - Android";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.ForeColor = System.Drawing.Color.OrangeRed;
            this.label7.Location = new System.Drawing.Point(370, 268);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(329, 22);
            this.label7.TabIndex = 49;
            this.label7.Text = "windows desktop - webgl [me]";
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.OrangeRed;
            this.button2.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button2.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button2.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button2.ForeColor = System.Drawing.Color.Black;
            this.button2.Location = new System.Drawing.Point(219, 207);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(152, 25);
            this.button2.TabIndex = 50;
            this.button2.Text = "Run in edge";
            this.button2.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.button2.UseVisualStyleBackColor = false;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // ANDROIDSDKPATH
            // 
            this.ANDROIDSDKPATH.BackColor = System.Drawing.Color.Black;
            this.ANDROIDSDKPATH.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROIDSDKPATH.ForeColor = System.Drawing.Color.DarkOrange;
            this.ANDROIDSDKPATH.Location = new System.Drawing.Point(140, 538);
            this.ANDROIDSDKPATH.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROIDSDKPATH.Name = "ANDROIDSDKPATH";
            this.ANDROIDSDKPATH.Size = new System.Drawing.Size(231, 21);
            this.ANDROIDSDKPATH.TabIndex = 51;
            this.ANDROIDSDKPATH.TextChanged += new System.EventHandler(this.ANDROIDSDKPATH_TextChanged);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.ForeColor = System.Drawing.Color.OrangeRed;
            this.label8.Location = new System.Drawing.Point(12, 544);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(128, 15);
            this.label8.TabIndex = 52;
            this.label8.Text = "Android SDK path:";
            // 
            // setAndroidSDKBtn
            // 
            this.setAndroidSDKBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.setAndroidSDKBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.setAndroidSDKBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.setAndroidSDKBtn.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.setAndroidSDKBtn.ForeColor = System.Drawing.Color.Black;
            this.setAndroidSDKBtn.Location = new System.Drawing.Point(379, 534);
            this.setAndroidSDKBtn.Name = "setAndroidSDKBtn";
            this.setAndroidSDKBtn.Size = new System.Drawing.Size(145, 25);
            this.setAndroidSDKBtn.TabIndex = 53;
            this.setAndroidSDKBtn.Text = "SET";
            this.setAndroidSDKBtn.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.setAndroidSDKBtn.UseVisualStyleBackColor = false;
            this.setAndroidSDKBtn.Click += new System.EventHandler(this.setAndroidSDKBtn_Click);
            // 
            // PackageForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(1059, 719);
            this.Controls.Add(this.setAndroidSDKBtn);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.ANDROIDSDKPATH);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.runInOpera);
            this.Controls.Add(this.runInFF);
            this.Controls.Add(this.runInChrome);
            this.Controls.Add(this.openfolderNative);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.HOSTPORT);
            this.Controls.Add(this.isSelfHost);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.NATIVEBuildPATH);
            this.Controls.Add(this.runLastNATIVEBuildBtn);
            this.Controls.Add(this.statusBuildNATIVE);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.statusBuildVJS3);
            this.Controls.Add(this.openfolderWebApp);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.webAppExportPath);
            this.Controls.Add(this.BuildForHybrid);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.buildForAndroid);
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
        public System.Windows.Forms.Button buildForAndroid;
        private System.Windows.Forms.Label label1;
        public System.Windows.Forms.Button BuildForHybrid;
        public System.Windows.Forms.TextBox webAppExportPath;
        private System.Windows.Forms.Label label2;
        public System.Windows.Forms.Button openfolderWebApp;
        public System.Windows.Forms.Label statusBuildVJS3;
        public System.Windows.Forms.Button button1;
        public System.Windows.Forms.Label statusBuildNATIVE;
        public System.Windows.Forms.Button runLastNATIVEBuildBtn;
        public System.Windows.Forms.TextBox NATIVEBuildPATH;
        public System.Windows.Forms.Label label3;
        private System.Windows.Forms.CheckBox isSelfHost;
        public System.Windows.Forms.TextBox HOSTPORT;
        public System.Windows.Forms.Label label4;
        public System.Windows.Forms.Button openfolderNative;
        public System.Windows.Forms.Button runInChrome;
        public System.Windows.Forms.Button runInFF;
        public System.Windows.Forms.Button runInOpera;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        public System.Windows.Forms.Button button2;
        public System.Windows.Forms.TextBox ANDROIDSDKPATH;
        public System.Windows.Forms.Label label8;
        public System.Windows.Forms.Button setAndroidSDKBtn;
    }
}