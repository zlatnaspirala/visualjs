﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace matrix_engine.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("matrix_engine.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {
        ///  &quot;name&quot;: &quot;matrix-engine-gui&quot;,
        ///  &quot;version&quot;: &quot;1.0.0&quot;,
        ///  &quot;description&quot;: &quot;How to use matrix engine from npm service.&quot;,
        ///  &quot;main&quot;: &quot;app.js&quot;,
        ///  &quot;type&quot;: &quot;module&quot;,
        ///  &quot;scripts&quot;: {
        ///    &quot;matrix-gui-install&quot;: &quot;npm i&quot;,
        ///    &quot;examples&quot;: &quot;watchify App-Examples.js -p [esmify --noImplicitAny] -o builds/examples.me.js&quot;,
        ///    &quot;build.roulette&quot;: &quot;browserify projects/matrix-roulette/App.js -p esmify &gt; builds/roulette.js&quot;,
        ///    &quot;build.examples&quot;: &quot;browserify App-Examples.js -p esmify &gt; builds/examples.me.js&quot;,
        ///    &quot;test&quot;: [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string package {
            get {
                return ResourceManager.GetString("package", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;!DOCTYPE html&gt;
        ///&lt;html lang=&quot;en&quot;&gt;
        ///  &lt;head&gt;
        ///    &lt;meta charset=&quot;UTF-8&quot; /&gt;
        ///    &lt;title&gt;Query url - folder apps ?u=example_name &lt;/title&gt;
        ///    &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;
        ///    &lt;meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; /&gt;
        ///    &lt;meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black-translucent&quot; /&gt;
        ///    &lt;meta name=&quot;theme-color&quot; content=&quot;#000000&quot; /&gt;
        ///    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,minimal-ui&quot; /&gt;
        ///    &lt;meta n [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string query {
            get {
                return ResourceManager.GetString("query", resourceCulture);
            }
        }
    }
}