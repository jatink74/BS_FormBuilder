namespace BS_FormBuilder.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Forms",
                c => new
                    {
                        FormId = c.Int(nullable: false, identity: true),
                        FormName = c.String(nullable: false, maxLength: 100),
                        FormJson = c.String(nullable: false),
                        FormBuilderJson = c.String(nullable: false),
                        CreatedOn = c.DateTime(nullable: false),
                        UpdatedOn = c.DateTime(),
                        RowVersion = c.Binary(),
                    })
                .PrimaryKey(t => t.FormId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Forms");
        }
    }
}
