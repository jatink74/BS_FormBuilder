using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BS_FormBuilder.Web.Models.Entities {
    
    public class FormBuilderContext : DbContext {

        public FormBuilderContext()
            : base("FormBuilderConnectionString") {
                Database.SetInitializer<FormBuilderContext>(new CreateDatabaseIfNotExists<FormBuilderContext>());
        }

        public DbSet<Form> Forms { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Form>().Property(f => f.RowVersion).IsConcurrencyToken();
        }
    }
}