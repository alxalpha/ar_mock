# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-18 16:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ar_mock', '0002_auto_20160418_1759'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resource',
            name='description',
        ),
    ]
