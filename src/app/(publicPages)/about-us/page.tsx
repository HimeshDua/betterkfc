import Image from 'next/image';
import {Separator} from '@/components/ui/separator';

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 max-w-4xl space-y-12 md:space-y-16">
        <section className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            KFC entered Pakistan in 1997 and since then, it&apos;s been a
            journey full of excitement and Finger Lickin&apos; goodness! The
            first KFC restaurant opened in Pakistan opened in Gulshan Iqbal,
            Karachi and now our Finger Lickin&apos; Chicken is available in 37
            cities with over 128 restaurants! Being the most loved fast food
            chain in Pakistan, KFC leaves no stone unturned to provide its
            customers the most delicious chicken and an excellent dining
            experience.
          </p>
          <p className="text-lg md:text-xl text-primary font-semibold mt-6">
            WE PRIDE OURSELVES ON USING QUALITY HALAL CHICKEN AND LOCAL
            INGREDIENTS FROM TRUSTED SUPPLIERS
          </p>
        </section>

        <Separator className="my-10 bg-border" />

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              History
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              It all started with Colonel Harland Sanders, the man who convinced
              the world by saying "We do chicken right!" Sanders took a great
              deal of time perfecting his iconic secret recipe of 11 herbs and
              spices, a legacy he&apos;s brought to the world through KFC&apos;s
              10,000+ restaurants. Starting from outside of his gas station in
              Korbin, Kentucky to being a globally recognized face, we owe our
              success to the Colonel&apos;s hard work and passion for sharing
              his love for chicken with the world!
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <Image
              src="/images/about/colonel-sanders.png"
              alt="Colonel Harland Sanders"
              width={350}
              height={350}
              className="rounded-full shadow-lg border-4 border-accent"
            />
          </div>
        </section>

        <Separator className="my-10 bg-border" />

        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
            The Story of World&apos;s Best Chicken
          </h2>
          <div className="relative flex flex-col items-center">
            <div className="absolute w-1 h-full bg-border left-1/2 -translate-x-1/2"></div>

            {[
              {year: '1890', text: 'Harland Sanders was born'},
              {
                year: '1930',
                text: 'Sanders Court & Cafe was opened in front of his gas station in Corbin Kentucky'
              },
              {
                year: '1940',
                text: 'Colonel Sanders develops the Original Recipe from 11 secret herbs and spices'
              },
              {
                year: '1952',
                text: 'The Colonel begins franchising his business travelling from town to town and cooking for restaurant owners'
              },
              {
                year: '1957',
                text: 'Kentucky Fried Chicken is first sold in buckets'
              },
              {
                year: '1964',
                text: 'More than 600 franchised outlets in the USA, Canda and UK'
              },
              {year: '1974', text: 'KFC first launches in Kuwait'},
              {
                year: '1980',
                text: 'Colonel Sanders passes away at the age of 90. His legacy lives on.'
              }
            ].map((item, index) => (
              <div
                key={item.year}
                className={`relative flex w-full justify-center items-center py-8`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0
                      ? 'pr-12 md:pr-20 text-right'
                      : 'pl-12 md:pl-20 text-left'
                  }`}
                >
                  <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {item.year}
                    </h3>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl ring-8 ring-background z-10">
                  {item.year}
                </div>

                <div
                  className={`hidden md:block w-1/2 ${
                    index % 2 === 0 ? 'pl-12 md:pl-20' : 'pr-12 md:pr-20'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10 bg-border" />

        <section className="text-center py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Today we have more than 25,000 KFC restaurants in over 145 countries
            and territories around the world.
          </p>
        </section>

        <Separator className="my-10 bg-border" />

        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
            Fast Facts about KFC Pakistan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                year: '1997',
                text: 'The first KFC restaurant in Pakistan opened in 1997 and was located in Gulshan-e-Iqbal Karachi.'
              },
              {
                year: '128',
                text: 'Today KFC has grown to over 128 restaurants across the country'
              },
              {
                year: '9',
                text: 'Giving back to the community, KFC runs 9 restaurants operated by deaf, Hearing With Heart team members'
              },
              {
                year: '9000+',
                text: 'Our Finger Lickin&apos; Chicken is brought to you by the hardwork of a team of 9000+ people across Pakistan'
              }
            ].map((fact) => (
              <div
                key={fact.year}
                className="bg-card p-6 rounded-lg shadow-md border border-border text-center"
              >
                <h3 className="text-5xl font-extrabold text-primary mb-3">
                  {fact.year}
                </h3>
                <p className="text-muted-foreground text-sm">{fact.text}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10 bg-border" />

        <section className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Mitao Bhook
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mitao Bhook is KFC&apos;s pledge to give back to society. Over the
            years we have made it our mission to spread the message of hope,
            bringing positive change in the lives of people and providing better
            living standards. Mitao Bhook strengthens the community on the
            pillars of Education, Inclusion & Diversity.
          </p>
          <ul className="list-disc list-inside text-lg text-muted-foreground mt-6 space-y-3 md:text-left">
            <li>
              Adopted 6 TCF schools since 2014 in Gadaap West, Muzaffargarh,
              Faisalabad, and Quetta, educating 1700+ students
            </li>
            <li>
              Proudly running the Deaf Reach KFC Campus and providing education
              and training to 340 deaf students
            </li>
            <li>
              Sponsoring higher education of 200+ students across HEC recognized
              universities in Pakistan
            </li>
            <li>
              Supporting TEGS – KFC Campus to provide quality education to
              students in Lahore
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
