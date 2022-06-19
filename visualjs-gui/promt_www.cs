using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Reflection;

public static class Prompt_www
{
    public static string ShowDialog(string text, string caption)
    {
        Form prompt = new Form();
        prompt.Width = 550;
        prompt.Height = 170;
        prompt.FormBorderStyle = FormBorderStyle.FixedToolWindow;
        prompt.Text = @"" + caption;
        prompt.StartPosition = FormStartPosition.CenterScreen;
        Label textLabel = new Label() { Left = 50, Top=20, Text=text , Width = 450 };
        TextBox textBox = new TextBox() { Left = 50, Top=50, Width=450 };
     //   TextBox textBox1 = new TextBox() { Left = 90, Top = 50, Width = 400 };
        Button confirmation = new Button() { Text = "Ok", Left=350, Width=100, Top=85, DialogResult = DialogResult.OK };
        confirmation.Click += (sender, e) => { prompt.Close(); };
        prompt.Controls.Add(textBox);
     //   prompt.Controls.Add(textBox1);
        prompt.Controls.Add(confirmation);
        prompt.Controls.Add(textLabel);
        prompt.AcceptButton = confirmation;

        return prompt.ShowDialog() == DialogResult.OK ? textBox.Text : "";
    }
}
