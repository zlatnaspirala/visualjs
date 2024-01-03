
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
            this.components = new System.ComponentModel.Container();
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
            this.ANDROID_AVD_HOME = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.setAVDPath = new System.Windows.Forms.Button();
            this.avdDesc = new System.Windows.Forms.Label();
            this.exportWebGL = new System.Windows.Forms.Button();
            this.webGLBuildPath = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.setAndroidAppUrlBtn = new System.Windows.Forms.Button();
            this.label15 = new System.Windows.Forms.Label();
            this.ANDROID_APP_URL = new System.Windows.Forms.TextBox();
            this.AVDS_LIST = new System.Windows.Forms.ComboBox();
            this.label16 = new System.Windows.Forms.Label();
            this.label17 = new System.Windows.Forms.Label();
            this.ANDROID_PROJECT_PATH = new System.Windows.Forms.TextBox();
            this.button3 = new System.Windows.Forms.Button();
            this.label18 = new System.Windows.Forms.Label();
            this.JAVA_HOME = new System.Windows.Forms.TextBox();
            this.BUILD_ANDROID_APPBTN = new System.Windows.Forms.Button();
            this.ANDROID_STUDIOBTN = new System.Windows.Forms.Button();
            this.label19 = new System.Windows.Forms.Label();
            this.ANDROID_STUDIO = new System.Windows.Forms.TextBox();
            this.label20 = new System.Windows.Forms.Label();
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.label21 = new System.Windows.Forms.Label();
            this.RUN_ANDROIDBTN = new System.Windows.Forms.Button();
            this.ATTACHCATLOGBTN = new System.Windows.Forms.Button();
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
            this.buildcanvas2dBtn.Location = new System.Drawing.Point(531, 101);
            this.buildcanvas2dBtn.Name = "buildcanvas2dBtn";
            this.buildcanvas2dBtn.Size = new System.Drawing.Size(318, 80);
            this.buildcanvas2dBtn.TabIndex = 2;
            this.buildcanvas2dBtn.Text = "Export Canvas2d web app";
            this.buildcanvas2dBtn.UseVisualStyleBackColor = false;
            this.buildcanvas2dBtn.Click += new System.EventHandler(this.buildcanvas2dBtn_Click);
            // 
            // buildForAndroid
            // 
            this.buildForAndroid.BackColor = System.Drawing.Color.OrangeRed;
            this.buildForAndroid.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.buildForAndroid.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buildForAndroid.ForeColor = System.Drawing.Color.Black;
            this.buildForAndroid.Image = global::matrix_engine.Properties.Resources._64x64;
            this.buildForAndroid.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.buildForAndroid.Location = new System.Drawing.Point(533, 634);
            this.buildForAndroid.Name = "buildForAndroid";
            this.buildForAndroid.Size = new System.Drawing.Size(316, 30);
            this.buildForAndroid.TabIndex = 3;
            this.buildForAndroid.Text = "Install and run emulator";
            this.toolTip1.SetToolTip(this.buildForAndroid, "Run emulator and install apk");
            this.buildForAndroid.UseVisualStyleBackColor = false;
            this.buildForAndroid.Click += new System.EventHandler(this.buildForAndroid_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Orbitron", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.OrangeRed;
            this.label1.Location = new System.Drawing.Point(6, 7);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(308, 25);
            this.label1.TabIndex = 9;
            this.label1.Text = "Matrix Engine - Packager";
            // 
            // BuildForHybrid
            // 
            this.BuildForHybrid.BackColor = System.Drawing.Color.OrangeRed;
            this.BuildForHybrid.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.BuildForHybrid.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BuildForHybrid.ForeColor = System.Drawing.Color.Black;
            this.BuildForHybrid.Image = global::matrix_engine.Properties.Resources.windows_logo_7753;
            this.BuildForHybrid.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.BuildForHybrid.Location = new System.Drawing.Point(531, 262);
            this.BuildForHybrid.Name = "BuildForHybrid";
            this.BuildForHybrid.Size = new System.Drawing.Size(318, 81);
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
            this.webAppExportPath.Location = new System.Drawing.Point(14, 104);
            this.webAppExportPath.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.webAppExportPath.Name = "webAppExportPath";
            this.webAppExportPath.Size = new System.Drawing.Size(512, 21);
            this.webAppExportPath.TabIndex = 31;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.OrangeRed;
            this.label2.Location = new System.Drawing.Point(14, 86);
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
            this.openfolderWebApp.Location = new System.Drawing.Point(15, 129);
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
            this.statusBuildVJS3.Location = new System.Drawing.Point(438, 85);
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
            this.button1.Location = new System.Drawing.Point(372, 291);
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
            this.statusBuildNATIVE.Location = new System.Drawing.Point(438, 248);
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
            this.runLastNATIVEBuildBtn.Location = new System.Drawing.Point(372, 318);
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
            this.NATIVEBuildPATH.Location = new System.Drawing.Point(19, 267);
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
            this.label3.Location = new System.Drawing.Point(16, 248);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(108, 15);
            this.label3.TabIndex = 39;
            this.label3.Text = "Last build path:";
            // 
            // isSelfHost
            // 
            this.isSelfHost.AutoSize = true;
            this.isSelfHost.ForeColor = System.Drawing.Color.DarkOrange;
            this.isSelfHost.Location = new System.Drawing.Point(962, 156);
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
            this.HOSTPORT.Location = new System.Drawing.Point(1010, 187);
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
            this.label4.Location = new System.Drawing.Point(964, 189);
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
            this.openfolderNative.Location = new System.Drawing.Point(19, 291);
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
            this.runInChrome.Location = new System.Drawing.Point(374, 129);
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
            this.runInFF.Location = new System.Drawing.Point(374, 156);
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
            this.runInOpera.Location = new System.Drawing.Point(219, 129);
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
            this.label5.ForeColor = System.Drawing.Color.White;
            this.label5.Location = new System.Drawing.Point(413, 52);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(235, 22);
            this.label5.TabIndex = 47;
            this.label5.Text = "Web app - Canvas2d";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.White;
            this.label6.Location = new System.Drawing.Point(331, 530);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(420, 22);
            this.label6.TabIndex = 48;
            this.label6.Text = "Webgl app or Canvas2D app - Android";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.ForeColor = System.Drawing.Color.White;
            this.label7.Location = new System.Drawing.Point(322, 218);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(446, 22);
            this.label7.TabIndex = 49;
            this.label7.Text = "Windows desktop - Webgl [matrix-engine]";
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.OrangeRed;
            this.button2.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button2.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button2.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button2.ForeColor = System.Drawing.Color.Black;
            this.button2.Location = new System.Drawing.Point(219, 156);
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
            this.ANDROIDSDKPATH.Location = new System.Drawing.Point(140, 683);
            this.ANDROIDSDKPATH.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROIDSDKPATH.Name = "ANDROIDSDKPATH";
            this.ANDROIDSDKPATH.Size = new System.Drawing.Size(337, 21);
            this.ANDROIDSDKPATH.TabIndex = 51;
            this.ANDROIDSDKPATH.TextChanged += new System.EventHandler(this.ANDROIDSDKPATH_TextChanged);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.ForeColor = System.Drawing.Color.OrangeRed;
            this.label8.Location = new System.Drawing.Point(10, 688);
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
            this.setAndroidSDKBtn.Location = new System.Drawing.Point(478, 679);
            this.setAndroidSDKBtn.Name = "setAndroidSDKBtn";
            this.setAndroidSDKBtn.Size = new System.Drawing.Size(46, 25);
            this.setAndroidSDKBtn.TabIndex = 53;
            this.setAndroidSDKBtn.Text = "SET";
            this.setAndroidSDKBtn.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.setAndroidSDKBtn.UseVisualStyleBackColor = false;
            this.setAndroidSDKBtn.Click += new System.EventHandler(this.setAndroidSDKBtn_Click);
            // 
            // ANDROID_AVD_HOME
            // 
            this.ANDROID_AVD_HOME.BackColor = System.Drawing.Color.Black;
            this.ANDROID_AVD_HOME.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROID_AVD_HOME.ForeColor = System.Drawing.Color.DarkOrange;
            this.ANDROID_AVD_HOME.Location = new System.Drawing.Point(140, 656);
            this.ANDROID_AVD_HOME.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROID_AVD_HOME.Name = "ANDROID_AVD_HOME";
            this.ANDROID_AVD_HOME.Size = new System.Drawing.Size(337, 21);
            this.ANDROID_AVD_HOME.TabIndex = 54;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.ForeColor = System.Drawing.Color.OrangeRed;
            this.label9.Location = new System.Drawing.Point(9, 660);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(130, 15);
            this.label9.TabIndex = 55;
            this.label9.Text = "Android AVD path:";
            // 
            // setAVDPath
            // 
            this.setAVDPath.BackColor = System.Drawing.Color.OrangeRed;
            this.setAVDPath.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.setAVDPath.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.setAVDPath.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.setAVDPath.ForeColor = System.Drawing.Color.Black;
            this.setAVDPath.Location = new System.Drawing.Point(478, 652);
            this.setAVDPath.Name = "setAVDPath";
            this.setAVDPath.Size = new System.Drawing.Size(46, 25);
            this.setAVDPath.TabIndex = 56;
            this.setAVDPath.Text = "SET";
            this.setAVDPath.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.setAVDPath.UseVisualStyleBackColor = false;
            this.setAVDPath.Click += new System.EventHandler(this.setAVDPath_Click);
            // 
            // avdDesc
            // 
            this.avdDesc.AutoSize = true;
            this.avdDesc.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.avdDesc.ForeColor = System.Drawing.Color.OrangeRed;
            this.avdDesc.Location = new System.Drawing.Point(137, 635);
            this.avdDesc.Name = "avdDesc";
            this.avdDesc.Size = new System.Drawing.Size(169, 15);
            this.avdDesc.TabIndex = 57;
            this.avdDesc.Text = "Searching for avd folder";
            // 
            // exportWebGL
            // 
            this.exportWebGL.BackColor = System.Drawing.Color.OrangeRed;
            this.exportWebGL.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.exportWebGL.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.exportWebGL.ForeColor = System.Drawing.Color.Black;
            this.exportWebGL.Image = global::matrix_engine.Properties.Resources.me;
            this.exportWebGL.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.exportWebGL.Location = new System.Drawing.Point(533, 417);
            this.exportWebGL.Name = "exportWebGL";
            this.exportWebGL.Size = new System.Drawing.Size(316, 81);
            this.exportWebGL.TabIndex = 58;
            this.exportWebGL.Text = "Export matrix-engine [webGL]";
            this.exportWebGL.UseVisualStyleBackColor = false;
            this.exportWebGL.Click += new System.EventHandler(this.exportWebGL_Click);
            // 
            // webGLBuildPath
            // 
            this.webGLBuildPath.BackColor = System.Drawing.Color.Black;
            this.webGLBuildPath.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.webGLBuildPath.ForeColor = System.Drawing.Color.DarkOrange;
            this.webGLBuildPath.Location = new System.Drawing.Point(19, 417);
            this.webGLBuildPath.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.webGLBuildPath.Name = "webGLBuildPath";
            this.webGLBuildPath.Size = new System.Drawing.Size(507, 21);
            this.webGLBuildPath.TabIndex = 59;
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label10.ForeColor = System.Drawing.Color.OrangeRed;
            this.label10.Location = new System.Drawing.Point(16, 398);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(108, 15);
            this.label10.TabIndex = 60;
            this.label10.Text = "Last build path:";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label11.ForeColor = System.Drawing.Color.White;
            this.label11.Location = new System.Drawing.Point(413, 378);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(237, 22);
            this.label11.TabIndex = 61;
            this.label11.Text = "Webgl [matrix-engine]";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label12.ForeColor = System.Drawing.Color.DimGray;
            this.label12.Location = new System.Drawing.Point(-32, 184);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(890, 22);
            this.label12.TabIndex = 62;
            this.label12.Text = "---------------------------------------------------------------------------------" +
    "-------";
            this.label12.Click += new System.EventHandler(this.label12_Click);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label13.ForeColor = System.Drawing.Color.DimGray;
            this.label13.Location = new System.Drawing.Point(-32, 342);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(890, 22);
            this.label13.TabIndex = 63;
            this.label13.Text = "---------------------------------------------------------------------------------" +
    "-------";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label14.ForeColor = System.Drawing.Color.DimGray;
            this.label14.Location = new System.Drawing.Point(-32, 501);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(890, 22);
            this.label14.TabIndex = 64;
            this.label14.Text = "---------------------------------------------------------------------------------" +
    "-------";
            // 
            // setAndroidAppUrlBtn
            // 
            this.setAndroidAppUrlBtn.BackColor = System.Drawing.Color.OrangeRed;
            this.setAndroidAppUrlBtn.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.setAndroidAppUrlBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.setAndroidAppUrlBtn.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.setAndroidAppUrlBtn.ForeColor = System.Drawing.Color.Black;
            this.setAndroidAppUrlBtn.Location = new System.Drawing.Point(478, 606);
            this.setAndroidAppUrlBtn.Name = "setAndroidAppUrlBtn";
            this.setAndroidAppUrlBtn.Size = new System.Drawing.Size(46, 25);
            this.setAndroidAppUrlBtn.TabIndex = 67;
            this.setAndroidAppUrlBtn.Text = "SET";
            this.setAndroidAppUrlBtn.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.setAndroidAppUrlBtn.UseVisualStyleBackColor = false;
            this.setAndroidAppUrlBtn.Click += new System.EventHandler(this.setAndroidAppUrlBtn_Click);
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label15.ForeColor = System.Drawing.Color.OrangeRed;
            this.label15.Location = new System.Drawing.Point(9, 614);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(132, 15);
            this.label15.TabIndex = 66;
            this.label15.Text = "Android APP_URL:";
            // 
            // ANDROID_APP_URL
            // 
            this.ANDROID_APP_URL.BackColor = System.Drawing.Color.Black;
            this.ANDROID_APP_URL.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROID_APP_URL.ForeColor = System.Drawing.Color.DarkOrange;
            this.ANDROID_APP_URL.Location = new System.Drawing.Point(140, 610);
            this.ANDROID_APP_URL.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROID_APP_URL.Name = "ANDROID_APP_URL";
            this.ANDROID_APP_URL.Size = new System.Drawing.Size(337, 21);
            this.ANDROID_APP_URL.TabIndex = 65;
            // 
            // AVDS_LIST
            // 
            this.AVDS_LIST.BackColor = System.Drawing.Color.Black;
            this.AVDS_LIST.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.AVDS_LIST.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.AVDS_LIST.ForeColor = System.Drawing.Color.OrangeRed;
            this.AVDS_LIST.FormattingEnabled = true;
            this.AVDS_LIST.Location = new System.Drawing.Point(140, 579);
            this.AVDS_LIST.Name = "AVDS_LIST";
            this.AVDS_LIST.Size = new System.Drawing.Size(337, 24);
            this.AVDS_LIST.TabIndex = 68;
            // 
            // label16
            // 
            this.label16.AutoSize = true;
            this.label16.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label16.ForeColor = System.Drawing.Color.OrangeRed;
            this.label16.Location = new System.Drawing.Point(56, 588);
            this.label16.Name = "label16";
            this.label16.Size = new System.Drawing.Size(78, 15);
            this.label16.TabIndex = 69;
            this.label16.Text = "AVDS List";
            // 
            // label17
            // 
            this.label17.AutoSize = true;
            this.label17.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label17.ForeColor = System.Drawing.Color.OrangeRed;
            this.label17.Location = new System.Drawing.Point(10, 717);
            this.label17.Name = "label17";
            this.label17.Size = new System.Drawing.Size(108, 15);
            this.label17.TabIndex = 71;
            this.label17.Text = "Source project:";
            // 
            // ANDROID_PROJECT_PATH
            // 
            this.ANDROID_PROJECT_PATH.BackColor = System.Drawing.Color.Black;
            this.ANDROID_PROJECT_PATH.Enabled = false;
            this.ANDROID_PROJECT_PATH.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROID_PROJECT_PATH.ForeColor = System.Drawing.Color.DarkOrange;
            this.ANDROID_PROJECT_PATH.Location = new System.Drawing.Point(140, 711);
            this.ANDROID_PROJECT_PATH.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROID_PROJECT_PATH.Name = "ANDROID_PROJECT_PATH";
            this.ANDROID_PROJECT_PATH.Size = new System.Drawing.Size(337, 21);
            this.ANDROID_PROJECT_PATH.TabIndex = 70;
            this.toolTip1.SetToolTip(this.ANDROID_PROJECT_PATH, "${this.Text}");
            // 
            // button3
            // 
            this.button3.BackColor = System.Drawing.Color.OrangeRed;
            this.button3.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.button3.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button3.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button3.ForeColor = System.Drawing.Color.Black;
            this.button3.Location = new System.Drawing.Point(478, 736);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(46, 25);
            this.button3.TabIndex = 74;
            this.button3.Text = "SET";
            this.button3.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.button3.UseVisualStyleBackColor = false;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // label18
            // 
            this.label18.AutoSize = true;
            this.label18.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label18.ForeColor = System.Drawing.Color.OrangeRed;
            this.label18.Location = new System.Drawing.Point(9, 744);
            this.label18.Name = "label18";
            this.label18.Size = new System.Drawing.Size(131, 15);
            this.label18.TabIndex = 73;
            this.label18.Text = "Env: JAVA_HOME";
            // 
            // JAVA_HOME
            // 
            this.JAVA_HOME.BackColor = System.Drawing.Color.Black;
            this.JAVA_HOME.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.JAVA_HOME.ForeColor = System.Drawing.Color.DarkOrange;
            this.JAVA_HOME.Location = new System.Drawing.Point(140, 740);
            this.JAVA_HOME.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.JAVA_HOME.Name = "JAVA_HOME";
            this.JAVA_HOME.Size = new System.Drawing.Size(337, 21);
            this.JAVA_HOME.TabIndex = 72;
            // 
            // BUILD_ANDROID_APPBTN
            // 
            this.BUILD_ANDROID_APPBTN.BackColor = System.Drawing.Color.OrangeRed;
            this.BUILD_ANDROID_APPBTN.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.BUILD_ANDROID_APPBTN.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BUILD_ANDROID_APPBTN.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.BUILD_ANDROID_APPBTN.ForeColor = System.Drawing.Color.Black;
            this.BUILD_ANDROID_APPBTN.Location = new System.Drawing.Point(533, 605);
            this.BUILD_ANDROID_APPBTN.Name = "BUILD_ANDROID_APPBTN";
            this.BUILD_ANDROID_APPBTN.Size = new System.Drawing.Size(316, 25);
            this.BUILD_ANDROID_APPBTN.TabIndex = 75;
            this.BUILD_ANDROID_APPBTN.Text = "BUILD ANDROID APP";
            this.BUILD_ANDROID_APPBTN.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.BUILD_ANDROID_APPBTN.UseVisualStyleBackColor = false;
            this.BUILD_ANDROID_APPBTN.Click += new System.EventHandler(this.BUILD_ANDROID_APPBTN_Click);
            // 
            // ANDROID_STUDIOBTN
            // 
            this.ANDROID_STUDIOBTN.BackColor = System.Drawing.Color.OrangeRed;
            this.ANDROID_STUDIOBTN.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ANDROID_STUDIOBTN.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ANDROID_STUDIOBTN.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROID_STUDIOBTN.ForeColor = System.Drawing.Color.Black;
            this.ANDROID_STUDIOBTN.Location = new System.Drawing.Point(478, 759);
            this.ANDROID_STUDIOBTN.Name = "ANDROID_STUDIOBTN";
            this.ANDROID_STUDIOBTN.Size = new System.Drawing.Size(46, 25);
            this.ANDROID_STUDIOBTN.TabIndex = 78;
            this.ANDROID_STUDIOBTN.Text = "SET";
            this.ANDROID_STUDIOBTN.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.ANDROID_STUDIOBTN.UseVisualStyleBackColor = false;
            this.ANDROID_STUDIOBTN.Click += new System.EventHandler(this.ANDROID_STUDIOBTN_Click);
            // 
            // label19
            // 
            this.label19.AutoSize = true;
            this.label19.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label19.ForeColor = System.Drawing.Color.OrangeRed;
            this.label19.Location = new System.Drawing.Point(9, 767);
            this.label19.Name = "label19";
            this.label19.Size = new System.Drawing.Size(104, 15);
            this.label19.TabIndex = 77;
            this.label19.Text = "Android Studio";
            // 
            // ANDROID_STUDIO
            // 
            this.ANDROID_STUDIO.BackColor = System.Drawing.Color.Black;
            this.ANDROID_STUDIO.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ANDROID_STUDIO.ForeColor = System.Drawing.Color.DarkOrange;
            this.ANDROID_STUDIO.Location = new System.Drawing.Point(140, 763);
            this.ANDROID_STUDIO.Margin = new System.Windows.Forms.Padding(5, 4, 5, 4);
            this.ANDROID_STUDIO.Name = "ANDROID_STUDIO";
            this.ANDROID_STUDIO.Size = new System.Drawing.Size(337, 21);
            this.ANDROID_STUDIO.TabIndex = 76;
            // 
            // label20
            // 
            this.label20.AutoSize = true;
            this.label20.Font = new System.Drawing.Font("Orbitron", 8.999999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label20.ForeColor = System.Drawing.Color.OrangeRed;
            this.label20.Location = new System.Drawing.Point(530, 585);
            this.label20.Name = "label20";
            this.label20.Size = new System.Drawing.Size(116, 15);
            this.label20.TabIndex = 79;
            this.label20.Text = "First make build.\r\n";
            // 
            // label21
            // 
            this.label21.AutoSize = true;
            this.label21.Font = new System.Drawing.Font("Orbitron", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label21.ForeColor = System.Drawing.Color.OrangeRed;
            this.label21.Location = new System.Drawing.Point(936, 127);
            this.label21.Name = "label21";
            this.label21.Size = new System.Drawing.Size(201, 22);
            this.label21.TabIndex = 80;
            this.label21.Text = "Local web server";
            // 
            // RUN_ANDROIDBTN
            // 
            this.RUN_ANDROIDBTN.BackColor = System.Drawing.Color.OrangeRed;
            this.RUN_ANDROIDBTN.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.RUN_ANDROIDBTN.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.RUN_ANDROIDBTN.Font = new System.Drawing.Font("Orbitron", 8.249999F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.RUN_ANDROIDBTN.ForeColor = System.Drawing.Color.Black;
            this.RUN_ANDROIDBTN.Image = global::matrix_engine.Properties.Resources._64x64;
            this.RUN_ANDROIDBTN.Location = new System.Drawing.Point(533, 668);
            this.RUN_ANDROIDBTN.Name = "RUN_ANDROIDBTN";
            this.RUN_ANDROIDBTN.Size = new System.Drawing.Size(316, 81);
            this.RUN_ANDROIDBTN.TabIndex = 81;
            this.RUN_ANDROIDBTN.Text = "RUN APK";
            this.RUN_ANDROIDBTN.UseVisualStyleBackColor = false;
            this.RUN_ANDROIDBTN.Click += new System.EventHandler(this.INSTALL_ANDROIDBTN_Click);
            // 
            // ATTACHCATLOGBTN
            // 
            this.ATTACHCATLOGBTN.BackColor = System.Drawing.Color.OrangeRed;
            this.ATTACHCATLOGBTN.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ATTACHCATLOGBTN.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ATTACHCATLOGBTN.ForeColor = System.Drawing.Color.Black;
            this.ATTACHCATLOGBTN.Image = global::matrix_engine.Properties.Resources._64x64;
            this.ATTACHCATLOGBTN.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.ATTACHCATLOGBTN.Location = new System.Drawing.Point(533, 753);
            this.ATTACHCATLOGBTN.Name = "ATTACHCATLOGBTN";
            this.ATTACHCATLOGBTN.Size = new System.Drawing.Size(316, 30);
            this.ATTACHCATLOGBTN.TabIndex = 82;
            this.ATTACHCATLOGBTN.Text = "LOGS";
            this.toolTip1.SetToolTip(this.ATTACHCATLOGBTN, "Run emulator and install apk");
            this.ATTACHCATLOGBTN.UseVisualStyleBackColor = false;
            this.ATTACHCATLOGBTN.Click += new System.EventHandler(this.ATTACHCATLOGBTN_Click);
            // 
            // PackageForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(1378, 822);
            this.Controls.Add(this.ATTACHCATLOGBTN);
            this.Controls.Add(this.RUN_ANDROIDBTN);
            this.Controls.Add(this.label21);
            this.Controls.Add(this.label20);
            this.Controls.Add(this.ANDROID_STUDIOBTN);
            this.Controls.Add(this.label19);
            this.Controls.Add(this.ANDROID_STUDIO);
            this.Controls.Add(this.BUILD_ANDROID_APPBTN);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.label18);
            this.Controls.Add(this.JAVA_HOME);
            this.Controls.Add(this.label17);
            this.Controls.Add(this.ANDROID_PROJECT_PATH);
            this.Controls.Add(this.label16);
            this.Controls.Add(this.AVDS_LIST);
            this.Controls.Add(this.setAndroidAppUrlBtn);
            this.Controls.Add(this.label15);
            this.Controls.Add(this.ANDROID_APP_URL);
            this.Controls.Add(this.label14);
            this.Controls.Add(this.label13);
            this.Controls.Add(this.label12);
            this.Controls.Add(this.label11);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.webGLBuildPath);
            this.Controls.Add(this.exportWebGL);
            this.Controls.Add(this.avdDesc);
            this.Controls.Add(this.setAVDPath);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.ANDROID_AVD_HOME);
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
        public System.Windows.Forms.TextBox ANDROID_AVD_HOME;
        public System.Windows.Forms.Label label9;
        public System.Windows.Forms.Button setAVDPath;
        public System.Windows.Forms.Label avdDesc;
        public System.Windows.Forms.Button exportWebGL;
        public System.Windows.Forms.TextBox webGLBuildPath;
        public System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label14;
        public System.Windows.Forms.Button setAndroidAppUrlBtn;
        public System.Windows.Forms.Label label15;
        public System.Windows.Forms.TextBox ANDROID_APP_URL;
        private System.Windows.Forms.ComboBox AVDS_LIST;
        public System.Windows.Forms.Label label16;
        public System.Windows.Forms.Label label17;
        public System.Windows.Forms.TextBox ANDROID_PROJECT_PATH;
        public System.Windows.Forms.Button button3;
        public System.Windows.Forms.Label label18;
        public System.Windows.Forms.TextBox JAVA_HOME;
        public System.Windows.Forms.Button BUILD_ANDROID_APPBTN;
        public System.Windows.Forms.Button ANDROID_STUDIOBTN;
        public System.Windows.Forms.Label label19;
        public System.Windows.Forms.TextBox ANDROID_STUDIO;
        public System.Windows.Forms.Label label20;
        private System.Windows.Forms.ToolTip toolTip1;
        private System.Windows.Forms.Label label21;
        public System.Windows.Forms.Button RUN_ANDROIDBTN;
        public System.Windows.Forms.Button ATTACHCATLOGBTN;
    }
}