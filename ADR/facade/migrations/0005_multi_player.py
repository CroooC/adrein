# Generated by Django 5.0.3 on 2024-03-21 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facade', '0004_alter_app_thumbnail_alter_functionality_thumbnail_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Multi_Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('genre', models.CharField(choices=[('AC', 'Action'), ('AV', 'Aventure'), ('AR', 'Arcade'), ('PL', 'Platformer'), ('OT', 'Other')], max_length=5)),
                ('description', models.CharField(max_length=1000)),
                ('active', models.BooleanField(default=True)),
                ('link', models.URLField(blank=True, null=True)),
                ('thumbnail', models.ImageField(upload_to='facade/templates/facade/img/thumbnail/')),
            ],
        ),
    ]
