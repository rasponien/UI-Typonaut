# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-06 14:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('time', models.DateTimeField()),
                ('medal', models.PositiveSmallIntegerField(choices=[(0, 'Bronze'), (1, 'Silver'), (3, 'Gold')])),
                ('sentence_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.Sentence')),
            ],
        ),
    ]