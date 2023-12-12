using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows.Forms;

namespace matrix_engine {
    public partial class About : Form {

        System.Timers.Timer aTimer;

        public About() {
            InitializeComponent();
           // Paint += OnPaint;
        }

        private float FUNY = 0;

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

        private void About_Load(object sender, EventArgs e) {

            aTimer = new System.Timers.Timer();
            aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
            aTimer.Interval = 10;
            aTimer.Enabled = true;

        }

        // Specify what you want to happen when the Elapsed event is raised.
        private void OnTimedEvent(object source, ElapsedEventArgs e) {
            Console.WriteLine("Hello World!" + FUNY.ToString());
            FUNY = FUNY + 1;
            if (FUNY > this.Height) {
                aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent2);
                aTimer.Elapsed -= new ElapsedEventHandler(OnTimedEvent);
            }
            this.Invalidate();
            this.Update();
        }

        private void InvokePaint() {
            throw new NotImplementedException();
        }

        private void OnTimedEvent2(object source, ElapsedEventArgs e) {
            Console.WriteLine("Hello World!" + FUNY.ToString());
            FUNY = FUNY - 1;
            if (FUNY < 0) {
                aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
                aTimer.Elapsed -= new ElapsedEventHandler(OnTimedEvent2);
            }
            this.Invalidate();
            this.Update();


        }

        protected override void OnPaint(PaintEventArgs e) {
            base.OnPaint(e);
            Graphics g;

            g = e.Graphics;

            Pen myPen = new Pen(Color.Red);
            myPen.Width = 20;
            g.DrawLine(myPen, 0, FUNY, this.Width, FUNY);
            // g.DrawLine(myPen, 1, 1, 45, 65);
        }

    }
    }
