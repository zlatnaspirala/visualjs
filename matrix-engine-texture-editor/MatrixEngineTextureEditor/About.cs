using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class About : Form {
        public About() {
            InitializeComponent();
            }

        private void w_Click(object sender, EventArgs e) {
            this.Close();
            this.Dispose();
        }

        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel1.Text);
        }

        private void linkLabel2_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel2.Text);
        }

        private void linkLabel3_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel3.Text);
        }

        private void linkLabel4_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel4.Text);
        }

        private void linkLabel5_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel5.Text);
        }

        private void linkLabel7_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel7.Text);
        }

        private void linkLabel8_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel8.Text);
        }

        private void linkLabel6_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e) {
            Process.Start("chrome.exe", linkLabel6.Text);
        }
    }
    }
