namespace BS_FormBuilder.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OpenDialogButtonPosition : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Forms", "OpenDialogBtnPosition", c => c.Int(nullable: false, defaultValue:2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Forms", "OpenDialogBtnPosition");
        }
    }
}
