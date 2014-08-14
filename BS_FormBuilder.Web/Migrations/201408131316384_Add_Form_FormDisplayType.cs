namespace BS_FormBuilder.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Form_FormDisplayType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Forms", "FormDisplayStyle", c => c.Int(nullable: false, defaultValue:0));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Forms", "FormDisplayStyle");
        }
    }
}
