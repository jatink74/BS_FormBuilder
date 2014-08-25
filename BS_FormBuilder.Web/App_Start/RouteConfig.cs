using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BS_FormBuilder.Web {
    public class RouteConfig {
        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "FormRunFormId",
                url: "{controller}/{action}/{formId}",
                defaults: new { formId = UrlParameter.Optional },
                constraints: new { formId = @"\d+" }
            );

            routes.MapRoute(
                name: "FormRunGuid",
                url: "{controller}/{action}/{guid}",
                defaults: new { guid = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
