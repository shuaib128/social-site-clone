import random
from django.core.management.base import BaseCommand
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from postsApi.models import Post
from users.models import Profile


class Command(BaseCommand):
    def handle(self, *args, **options):
        title_path = r"E:\Django Projects\3. socialsite_with_api\site\postsApi\management\contents\titles.txt"

        with open(title_path) as title:
            lines = title.readlines()
            count = 0

            for index, line in enumerate(lines):
                id_ = id=random.randint(2, 4)
                Post.objects.create(
                    title = line,
                    description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    cover_image = f"media/postsImage/{index}.jpg",
                    auhtor = get_object_or_404(User, id=id_),
                    ProfileItems = get_object_or_404(Profile, id=id_),
                )
                print(count)
                count += 1