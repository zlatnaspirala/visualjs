namespace Visual_JS
{
    partial class FormAdd
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

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.go_name = new System.Windows.Forms.TextBox();
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.checkBox2 = new System.Windows.Forms.CheckBox();
            this.checkBox3 = new System.Windows.Forms.CheckBox();
            this.checkBox4 = new System.Windows.Forms.CheckBox();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.modul_name = new System.Windows.Forms.ComboBox();
            this.label7 = new System.Windows.Forms.Label();
            this.program_name = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.pictureBox3 = new System.Windows.Forms.PictureBox();
            this.pictureBox4 = new System.Windows.Forms.PictureBox();
            this.listOfResImages = new System.Windows.Forms.ComboBox();
            this.initialText = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.selectColor_TEXTBOX = new System.Windows.Forms.Button();
            this.textColor = new System.Windows.Forms.Button();
            this.RADIUSTEXTBOX = new System.Windows.Forms.TextBox();
            this.DRAG = new System.Windows.Forms.CheckBox();
            this.radioButton1 = new System.Windows.Forms.RadioButton();
            this.radioButton2 = new System.Windows.Forms.RadioButton();
            this.label11 = new System.Windows.Forms.Label();
            this.checkBox5 = new System.Windows.Forms.CheckBox();
            this.plusMinus4 = new Visual_JS.plusMinus();
            this.plusMinus3 = new Visual_JS.plusMinus();
            this.plusMinus2 = new Visual_JS.plusMinus();
            this.plusMinus1 = new Visual_JS.plusMinus();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.Black;
            this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label1.Location = new System.Drawing.Point(41, 131);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(23, 15);
            this.label1.TabIndex = 1;
            this.label1.Text = "X : ";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.BackColor = System.Drawing.Color.Black;
            this.label2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label2.Location = new System.Drawing.Point(41, 193);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(23, 15);
            this.label2.TabIndex = 3;
            this.label2.Text = "Y : ";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.BackColor = System.Drawing.Color.Black;
            this.label3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label3.Location = new System.Drawing.Point(28, 250);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(49, 15);
            this.label3.TabIndex = 5;
            this.label3.Text = "WIDTH:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.BackColor = System.Drawing.Color.Black;
            this.label4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label4.Location = new System.Drawing.Point(28, 309);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(52, 15);
            this.label4.TabIndex = 7;
            this.label4.Text = "HEIGHT:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.BackColor = System.Drawing.Color.Black;
            this.label5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label5.Location = new System.Drawing.Point(31, 76);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(49, 15);
            this.label5.TabIndex = 8;
            this.label5.Text = "Name : ";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.BackColor = System.Drawing.Color.Black;
            this.label6.Font = new System.Drawing.Font("Candara", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.Location = new System.Drawing.Point(299, 13);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(316, 26);
            this.label6.TabIndex = 9;
            this.label6.Text = "Add new game object form dialog";
            // 
            // go_name
            // 
            this.go_name.BackColor = System.Drawing.Color.Black;
            this.go_name.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(124)))), ((int)(((byte)(255)))));
            this.go_name.Location = new System.Drawing.Point(96, 71);
            this.go_name.Name = "go_name";
            this.go_name.Size = new System.Drawing.Size(165, 23);
            this.go_name.TabIndex = 10;
            this.go_name.Text = "myFirstGameObject";
            // 
            // checkBox1
            // 
            this.checkBox1.AutoSize = true;
            this.checkBox1.BackColor = System.Drawing.Color.Black;
            this.checkBox1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.checkBox1.Location = new System.Drawing.Point(351, 132);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(194, 19);
            this.checkBox1.TabIndex = 11;
            this.checkBox1.Text = "Add image/images component";
            this.checkBox1.UseVisualStyleBackColor = false;
            this.checkBox1.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // checkBox2
            // 
            this.checkBox2.AutoSize = true;
            this.checkBox2.BackColor = System.Drawing.Color.Black;
            this.checkBox2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.checkBox2.Location = new System.Drawing.Point(351, 175);
            this.checkBox2.Name = "checkBox2";
            this.checkBox2.Size = new System.Drawing.Size(163, 19);
            this.checkBox2.TabIndex = 12;
            this.checkBox2.Text = "Add textbox component";
            this.checkBox2.UseVisualStyleBackColor = false;
            this.checkBox2.CheckedChanged += new System.EventHandler(this.checkBox2_CheckedChanged);
            // 
            // checkBox3
            // 
            this.checkBox3.AutoSize = true;
            this.checkBox3.BackColor = System.Drawing.Color.Black;
            this.checkBox3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.checkBox3.Location = new System.Drawing.Point(351, 222);
            this.checkBox3.Name = "checkBox3";
            this.checkBox3.Size = new System.Drawing.Size(165, 19);
            this.checkBox3.TabIndex = 13;
            this.checkBox3.Text = "Add webcam component";
            this.checkBox3.UseVisualStyleBackColor = false;
            this.checkBox3.CheckedChanged += new System.EventHandler(this.checkBox3_CheckedChanged);
            // 
            // checkBox4
            // 
            this.checkBox4.AutoSize = true;
            this.checkBox4.BackColor = System.Drawing.Color.Black;
            this.checkBox4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.checkBox4.Location = new System.Drawing.Point(349, 306);
            this.checkBox4.Name = "checkBox4";
            this.checkBox4.Size = new System.Drawing.Size(93, 19);
            this.checkBox4.TabIndex = 15;
            this.checkBox4.Text = "Add particle";
            this.checkBox4.UseVisualStyleBackColor = false;
            this.checkBox4.CheckedChanged += new System.EventHandler(this.checkBox4_CheckedChanged);
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.Black;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.Location = new System.Drawing.Point(546, 395);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(171, 52);
            this.button1.TabIndex = 16;
            this.button1.Text = "ADD";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.Black;
            this.button2.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button2.Location = new System.Drawing.Point(730, 395);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(171, 52);
            this.button2.TabIndex = 17;
            this.button2.Text = "CANCEL";
            this.button2.UseVisualStyleBackColor = false;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // modul_name
            // 
            this.modul_name.BackColor = System.Drawing.Color.Black;
            this.modul_name.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.modul_name.FormattingEnabled = true;
            this.modul_name.Items.AddRange(new object[] {
            "STARTER",
            "GUI_STARTER"});
            this.modul_name.Location = new System.Drawing.Point(450, 94);
            this.modul_name.Name = "modul_name";
            this.modul_name.Size = new System.Drawing.Size(121, 23);
            this.modul_name.TabIndex = 18;
            this.modul_name.Text = "STARTER";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.BackColor = System.Drawing.Color.Black;
            this.label7.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label7.Location = new System.Drawing.Point(342, 97);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(85, 15);
            this.label7.TabIndex = 19;
            this.label7.Text = "Modul name : ";
            // 
            // program_name
            // 
            this.program_name.BackColor = System.Drawing.Color.Black;
            this.program_name.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.program_name.Location = new System.Drawing.Point(450, 66);
            this.program_name.Name = "program_name";
            this.program_name.Size = new System.Drawing.Size(121, 23);
            this.program_name.TabIndex = 21;
            this.program_name.Text = "HELLO_WORLD";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.BackColor = System.Drawing.Color.Black;
            this.label8.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label8.Location = new System.Drawing.Point(341, 69);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(95, 15);
            this.label8.TabIndex = 20;
            this.label8.Text = "Program name :";
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(164)))), ((int)(((byte)(255)))));
            this.pictureBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox1.Location = new System.Drawing.Point(-5, 460);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(941, 13);
            this.pictureBox1.TabIndex = 22;
            this.pictureBox1.TabStop = false;
            // 
            // pictureBox2
            // 
            this.pictureBox2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(164)))), ((int)(((byte)(255)))));
            this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox2.Location = new System.Drawing.Point(-5, -3);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(941, 13);
            this.pictureBox2.TabIndex = 23;
            this.pictureBox2.TabStop = false;
            // 
            // pictureBox3
            // 
            this.pictureBox3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(164)))), ((int)(((byte)(255)))));
            this.pictureBox3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox3.Location = new System.Drawing.Point(-5, -3);
            this.pictureBox3.Name = "pictureBox3";
            this.pictureBox3.Size = new System.Drawing.Size(15, 476);
            this.pictureBox3.TabIndex = 24;
            this.pictureBox3.TabStop = false;
            // 
            // pictureBox4
            // 
            this.pictureBox4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(164)))), ((int)(((byte)(255)))));
            this.pictureBox4.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox4.Location = new System.Drawing.Point(918, -3);
            this.pictureBox4.Name = "pictureBox4";
            this.pictureBox4.Size = new System.Drawing.Size(15, 476);
            this.pictureBox4.TabIndex = 25;
            this.pictureBox4.TabStop = false;
            // 
            // listOfResImages
            // 
            this.listOfResImages.BackColor = System.Drawing.Color.Black;
            this.listOfResImages.Enabled = false;
            this.listOfResImages.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.listOfResImages.FormattingEnabled = true;
            this.listOfResImages.Location = new System.Drawing.Point(654, 128);
            this.listOfResImages.Name = "listOfResImages";
            this.listOfResImages.Size = new System.Drawing.Size(121, 23);
            this.listOfResImages.TabIndex = 26;
            // 
            // initialText
            // 
            this.initialText.BackColor = System.Drawing.Color.Black;
            this.initialText.Enabled = false;
            this.initialText.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.initialText.Location = new System.Drawing.Point(654, 173);
            this.initialText.Name = "initialText";
            this.initialText.Size = new System.Drawing.Size(121, 23);
            this.initialText.TabIndex = 27;
            this.initialText.Text = "TextBox Text";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.BackColor = System.Drawing.Color.Black;
            this.label9.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label9.Location = new System.Drawing.Point(564, 177);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(70, 15);
            this.label9.TabIndex = 28;
            this.label9.Text = "initial text :";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.BackColor = System.Drawing.Color.Black;
            this.label10.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label10.Location = new System.Drawing.Point(562, 132);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(90, 15);
            this.label10.TabIndex = 29;
            this.label10.Text = "Animation set :";
            // 
            // selectColor_TEXTBOX
            // 
            this.selectColor_TEXTBOX.BackColor = System.Drawing.Color.Black;
            this.selectColor_TEXTBOX.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.selectColor_TEXTBOX.Location = new System.Drawing.Point(781, 171);
            this.selectColor_TEXTBOX.Name = "selectColor_TEXTBOX";
            this.selectColor_TEXTBOX.Size = new System.Drawing.Size(120, 27);
            this.selectColor_TEXTBOX.TabIndex = 30;
            this.selectColor_TEXTBOX.Text = "Color";
            this.selectColor_TEXTBOX.UseVisualStyleBackColor = false;
            this.selectColor_TEXTBOX.Click += new System.EventHandler(this.selectColor_TEXTBOX_Click);
            // 
            // textColor
            // 
            this.textColor.BackColor = System.Drawing.Color.Black;
            this.textColor.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.textColor.Location = new System.Drawing.Point(781, 204);
            this.textColor.Name = "textColor";
            this.textColor.Size = new System.Drawing.Size(120, 27);
            this.textColor.TabIndex = 31;
            this.textColor.Text = "Text Color";
            this.textColor.UseVisualStyleBackColor = false;
            this.textColor.Click += new System.EventHandler(this.textColor_Click);
            // 
            // RADIUSTEXTBOX
            // 
            this.RADIUSTEXTBOX.BackColor = System.Drawing.Color.Black;
            this.RADIUSTEXTBOX.Enabled = false;
            this.RADIUSTEXTBOX.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.RADIUSTEXTBOX.Location = new System.Drawing.Point(654, 204);
            this.RADIUSTEXTBOX.Name = "RADIUSTEXTBOX";
            this.RADIUSTEXTBOX.Size = new System.Drawing.Size(121, 23);
            this.RADIUSTEXTBOX.TabIndex = 32;
            this.RADIUSTEXTBOX.Text = "0.2";
            // 
            // DRAG
            // 
            this.DRAG.AutoSize = true;
            this.DRAG.BackColor = System.Drawing.Color.Black;
            this.DRAG.Checked = true;
            this.DRAG.CheckState = System.Windows.Forms.CheckState.Checked;
            this.DRAG.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.DRAG.Location = new System.Drawing.Point(629, 71);
            this.DRAG.Name = "DRAG";
            this.DRAG.Size = new System.Drawing.Size(52, 19);
            this.DRAG.TabIndex = 33;
            this.DRAG.Text = "Drag";
            this.DRAG.UseVisualStyleBackColor = false;
            // 
            // radioButton1
            // 
            this.radioButton1.AutoSize = true;
            this.radioButton1.Checked = true;
            this.radioButton1.Location = new System.Drawing.Point(378, 248);
            this.radioButton1.Name = "radioButton1";
            this.radioButton1.Size = new System.Drawing.Size(66, 19);
            this.radioButton1.TabIndex = 34;
            this.radioButton1.TabStop = true;
            this.radioButton1.Text = "Normal";
            this.radioButton1.UseVisualStyleBackColor = true;
            this.radioButton1.CheckedChanged += new System.EventHandler(this.radioButton1_CheckedChanged);
            // 
            // radioButton2
            // 
            this.radioButton2.AutoSize = true;
            this.radioButton2.Location = new System.Drawing.Point(378, 273);
            this.radioButton2.Name = "radioButton2";
            this.radioButton2.Size = new System.Drawing.Size(47, 19);
            this.radioButton2.TabIndex = 35;
            this.radioButton2.Text = "NUI";
            this.radioButton2.UseVisualStyleBackColor = true;
            this.radioButton2.CheckedChanged += new System.EventHandler(this.radioButton2_CheckedChanged);
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.BackColor = System.Drawing.Color.Black;
            this.label11.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.label11.Location = new System.Drawing.Point(431, 275);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(75, 15);
            this.label11.TabIndex = 36;
            this.label11.Text = "samples 6x6";
            // 
            // checkBox5
            // 
            this.checkBox5.AutoSize = true;
            this.checkBox5.BackColor = System.Drawing.Color.Black;
            this.checkBox5.Enabled = false;
            this.checkBox5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.checkBox5.Location = new System.Drawing.Point(349, 340);
            this.checkBox5.Name = "checkBox5";
            this.checkBox5.Size = new System.Drawing.Size(190, 19);
            this.checkBox5.TabIndex = 37;
            this.checkBox5.Text = "Add simple colide component";
            this.checkBox5.UseVisualStyleBackColor = false;
            this.checkBox5.CheckedChanged += new System.EventHandler(this.checkBox5_CheckedChanged);
            // 
            // plusMinus4
            // 
            this.plusMinus4.BackColor = System.Drawing.Color.Black;
            this.plusMinus4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.plusMinus4.Location = new System.Drawing.Point(70, 290);
            this.plusMinus4.Name = "plusMinus4";
            this.plusMinus4.Size = new System.Drawing.Size(214, 64);
            this.plusMinus4.TabIndex = 6;
            // 
            // plusMinus3
            // 
            this.plusMinus3.BackColor = System.Drawing.Color.Black;
            this.plusMinus3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(124)))), ((int)(((byte)(255)))));
            this.plusMinus3.Location = new System.Drawing.Point(70, 231);
            this.plusMinus3.Name = "plusMinus3";
            this.plusMinus3.Size = new System.Drawing.Size(214, 59);
            this.plusMinus3.TabIndex = 4;
            // 
            // plusMinus2
            // 
            this.plusMinus2.BackColor = System.Drawing.Color.Black;
            this.plusMinus2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(124)))), ((int)(((byte)(255)))));
            this.plusMinus2.Location = new System.Drawing.Point(70, 172);
            this.plusMinus2.Name = "plusMinus2";
            this.plusMinus2.Size = new System.Drawing.Size(214, 53);
            this.plusMinus2.TabIndex = 2;
            // 
            // plusMinus1
            // 
            this.plusMinus1.BackColor = System.Drawing.Color.Black;
            this.plusMinus1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(124)))), ((int)(((byte)(124)))), ((int)(((byte)(255)))));
            this.plusMinus1.Location = new System.Drawing.Point(70, 112);
            this.plusMinus1.Name = "plusMinus1";
            this.plusMinus1.Size = new System.Drawing.Size(201, 54);
            this.plusMinus1.TabIndex = 0;
            // 
            // FormAdd
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(931, 475);
            this.Controls.Add(this.checkBox5);
            this.Controls.Add(this.label11);
            this.Controls.Add(this.radioButton2);
            this.Controls.Add(this.radioButton1);
            this.Controls.Add(this.DRAG);
            this.Controls.Add(this.RADIUSTEXTBOX);
            this.Controls.Add(this.textColor);
            this.Controls.Add(this.selectColor_TEXTBOX);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.initialText);
            this.Controls.Add(this.listOfResImages);
            this.Controls.Add(this.pictureBox4);
            this.Controls.Add(this.pictureBox3);
            this.Controls.Add(this.pictureBox2);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.program_name);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.modul_name);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.checkBox4);
            this.Controls.Add(this.checkBox3);
            this.Controls.Add(this.checkBox2);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.go_name);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.plusMinus4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.plusMinus3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.plusMinus2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.plusMinus1);
            this.Font = new System.Drawing.Font("Candara", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(127)))), ((int)(((byte)(255)))));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "FormAdd";
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
            this.Text = "FormAdd";
            this.Load += new System.EventHandler(this.FormAdd_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private plusMinus plusMinus1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private plusMinus plusMinus2;
        private System.Windows.Forms.Label label3;
        private plusMinus plusMinus3;
        private plusMinus plusMinus4;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox go_name;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.CheckBox checkBox2;
        private System.Windows.Forms.CheckBox checkBox3;
        private System.Windows.Forms.CheckBox checkBox4;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.ComboBox modul_name;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox program_name;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.PictureBox pictureBox3;
        private System.Windows.Forms.PictureBox pictureBox4;
        private System.Windows.Forms.ComboBox listOfResImages;
        private System.Windows.Forms.TextBox initialText;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.Button selectColor_TEXTBOX;
        private System.Windows.Forms.Button textColor;
        private System.Windows.Forms.TextBox RADIUSTEXTBOX;
        private System.Windows.Forms.CheckBox DRAG;
        private System.Windows.Forms.RadioButton radioButton1;
        private System.Windows.Forms.RadioButton radioButton2;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.CheckBox checkBox5;
    }
}